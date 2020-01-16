import {rlphash, ecrecover, bufferToInt, ecsign, rlp, toBuffer, stripZeros} from 'ethereumjs-util';
import * as Utils from '../../../ft-utils/src/utils/Utils';

export default class ContractTx {
    constructor(data, chainID) {
        /**
         * Creates a new contract transaction from an object with its fields' values.
         *
         * @param data - A transaction can be initialized with its rlp representation, an array containing
         * the value of its fields in order, or an object containing them by name.
         *
         * @param chainID
         *
         * @example
         * ```js
         * const txData = {
         *   type: 1,
         *   gasAssetID: 0,
         *   gasPrice: 1000000000,
         *   gasLimit: 1000000,
         *   nonce: 0,
         *   from: 'testsender',
         *   to:'testrecipient',
         *   assetID: 0,
         *   value: 100000000,
         *   data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
         *   remark: 'test remark'
         *   signature: '0x1c5e1d3a76fbf824220eafc8c79ad578ad2b67d01b0c2425eb1f1347e8f50882ab',
         * };
         * const tx = new ContractTx(txData);
         * ```
         */

        this._chainID = chainID;
        this._senderPubKey = Buffer.from([]);

        // Define Properties
        const fields = [
            {
                name: 'type',
                length: 1,
                allowZero: false
            },
            {
                name: 'gasAssetID',
                length: 32,
                allowLess: true
            },
            {
                name: 'gasPrice',
                length: 32,
                allowLess: true
            },
            {
                name: 'gasLimit',
                length: 32,
                allowLess: true
            },
            {
                name: 'nonce',
                length: 32,
                allowLess: true
            },
            {
                name: 'from',
                length: 32,
                allowLess: true
            },
            {
                name: 'to',
                length: 32,
                allowLess: true
            },
            {
                name: 'assetID',
                length: 32,
                allowLess: true
            },
            {
                name: 'value',
                length: 32,
                allowLess: true
            },
            {
                name: 'data',
                allowZero: false
            },
            {
                name: 'remark',
                allowZero: true
            },
            {
                name: 'signature',
                allowZero: true
            }
        ];

        // attached serialize
        Utils.DefineProperties(this, fields, data);
    }

    /**
     * sign a transaction with a given private key
     * @param {buffer} privateKey - Must be 32 bytes in length
     */
    sign(privateKey) {
        const messageHash = this.hash(false);
        const sig = ecsign(messageHash, privateKey);

        sig.v += this.getChainID() * 2 + 8;

        // const totalLength = Buffer.from(sig.v).length + Buffer.from(sig.r).length + Buffer.from(sig.s).length;

        // const signatureHex = Buffer.concat(
        //     [Buffer.from(sig.v), Buffer.from(sig.r), Buffer.from(sig.s)],
        //     totalLength
        // ).toString('hex');

        let signatureHex = '0x' + sig.r.toString('hex') + sig.s.toString('hex') + toBuffer(sig.v).toString('hex');

        this.signature = signatureHex;
    }

    /**
     * Validates the signature and checks to see if it has enough gas.
     * @returns {String} error
     */
    validate() {
        const errors = [];
        if (!this.verifySignature()) {
            errors.push('Invalid Signature');
        }

        return errors.join(' ');
    }

    /**
     * Determines if the signature is valid
     * @returns {boolean}
     */
    verifySignature() {
        const messageHash = this.hash(false);

        try {
            const sig = Utils.getSignatureParameters('0x' + this.signature.toString('hex'));

            const v = bufferToInt(sig.v);
            // const useChainIdWhileRecoveringPubKey =
            //     v >= this.getChainID() * 2 + 35 && this._common.gteHardfork('spuriousDragon');
            this._senderPubKey = ecrecover(
                messageHash,
                v,
                sig.r,
                sig.s,
                // useChainIdWhileRecoveringPubKey ? this.getChainID() : undefined
                this.getChainID()
            );
        } catch (error) {
            console.log(error);
            return false;
        }

        return !!this._senderPubKey;
    }

    /**
     * Computes a sha3-256 hash of the serialized tx
     * @param {boolean} includeSignature - Whether or not to include the signature
     * @returns {Buffer} the hash of the transaction
     */
    hash(includeSignature) {
        let items;
        if (includeSignature) {
            items = [[...this.raw.slice(0, 7)], ...this.raw.slice(7, 12)];
        } else {
            // sign hash
            items = [
                ...this.raw.slice(0, 11),
                toBuffer(this.getChainID()),
                stripZeros(toBuffer(0)),
                stripZeros(toBuffer(0))
            ];
        }

        // create hash
        return rlphash(items);
    }

    /**
     * @returns {Buffer} the rlp encoding of the transaction
     */
    serialize() {
        const items = [[...this.raw.slice(0, 7)], ...this.raw.slice(7, 12)];
        return rlp.encode([this.raw[0], items]);
    }

    /**
     * returns chain ID
     */
    getChainID() {
        return this._chainID;
    }
}
