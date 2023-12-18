import {Contract} from "../../domain/contract";

const ALPH_ARTIFACT =         {
    "version": "v2.5.9",
    "name": "BuyTimedWithoutToken",
    "bytecodeTemplate": "0101030001000ab417001600{1}a2{1}0d0c{0}0108",
    "fieldsSig": {
        "names": [
            "walphContract",
            "amount"
        ],
        "types": [
            "ByteVec",
            "U256"
        ],
        "isMutable": [
            false,
            false
        ]
    },
    "functions": [
        {
            "name": "main",
            "usePreapprovedAssets": true,
            "useAssetsInContract": false,
            "isPublic": true,
            "paramNames": [],
            "paramTypes": [],
            "paramIsMutable": [],
            "returnTypes": []
        }
    ]
};

const TOKEN_ARTIFACT = {
    "version": "v2.5.9",
    "name": "BuyTimedWithToken",
    "bytecodeTemplate": "0101030001000eb4170016007a{2}{1}a313c3038d7ea4c68000a2{1}0d0c{0}0108",
    "fieldsSig": {
        "names": [
            "walphContract",
            "amount",
            "tokenId"
        ],
        "types": [
            "ByteVec",
            "U256",
            "ByteVec"
        ],
        "isMutable": [
            false,
            false,
            false
        ]
    },
    "functions": [
        {
            "name": "main",
            "usePreapprovedAssets": true,
            "useAssetsInContract": false,
            "isPublic": true,
            "paramNames": [],
            "paramTypes": [],
            "paramIsMutable": [],
            "returnTypes": []
        }
    ]
}

export const CONTRACTS = [
    new Contract( // 5 ALPH daily
        "dab039d59282b573fc9badb7f936fb868a16313c01667b63fa41fd15d3b6a101",
        "29Qcr1sH2a74W7z9upaty8pacos6YK2zdsuUknBKMaVZi",
        1,"ALPH", 60 * 24, 5,
        ALPH_ARTIFACT,
    ),
    new Contract( // 1 ALPH daily
        "81afbfae2e618b12363ca2b68e55e5e8f522665a450770e95fce093a3fe90b01",
        "23RC91AHkemMazD7JZYRN12tDfKgphAXMGYReiGEtgLxx",
        1,"ALPH", 60 * 24, 1,
        ALPH_ARTIFACT
    ),
    new Contract( // 10 ALPH 3days
        "77d0179b110ca728b35f1820ff29ffd48fe71b57f1cbee2a84d16382b2e81901",
        "22kefcUsY89fn98RajNDArCQUhtQZPma5fkjaP4mBmyQk",
        1,"ALPH", 60 * 24 * 3, 10,
        ALPH_ARTIFACT
    ),
    new Contract( // 1 ALF 3days
        "fe081977a7e6418e5ace0739d3672f49d905e5b3e011bd998b65fc9962437901",
        "2BnaqAFKWtzKi8NeVZnhWiRP9X6fdEE5KF7aW2RPzSmPW",
        1,"ALF", 60 * 24 * 3, 1,
        TOKEN_ARTIFACT
    ),
    new Contract( // 1 AYIN 3days
        "3af5a50e2aa8c0c2f6508033333fc7fdf46cb1b3d27d65f17edc90541f2ced01",
        "xf71TGxSTzeixTRYpadFrUZtiv69aGZHk2b9jivi66Re",
        1,"AYIN", 60 * 24 * 3, 1,
        TOKEN_ARTIFACT
    ),
    new Contract( // 1 USDT 3days
        "319df8abbc0bd8a029dad8f323cd21469897c6168baf204149d3f697ce99b501",
        "x2doPNAxscBLdvh6hP3naWppB7KCV4Drx1AQjgpfYUg8",
        1,"USDT", 60 * 24 * 3, 1,
        TOKEN_ARTIFACT
    ),
    new Contract( // 1 USDC 3days
        "851b43cd8e749c40eb33177e414f15067204610efee034a4ba81a78567678c01",
        "23eYT2xoTGcb5zsJE271KHZ2KiaW7oQyngvczvzGrGZXn",
        1,"USDC", 60 * 24 * 3, 1,
        TOKEN_ARTIFACT
    ),
    new Contract( // 500 NGU 3days
        "e3ef3ff9bedb92119c2b4f92b35a0c8384fb1aaed894413756fc46a7fc522601",
        "2A2iFgS2BUmn72z4H3HhKGdxMcu7hbiTugSbLq2Db7ZHJ",
        1,"NGU", 60 * 24 * 3, 500,
        TOKEN_ARTIFACT
    ),
    new Contract( // 1000 NGU 5days
        "f68b403b8b6dc093b4a2e37d65d68e96796cf5fb6d5257daa25147ab972fd101",
        "2BHMZTxsL59LuMGuzR8c2tsbJgNNW1SZMqWN1KggQH2DN",
        1,"NGU", 60 * 24 * 5, 1000,
        TOKEN_ARTIFACT
    ),
];
