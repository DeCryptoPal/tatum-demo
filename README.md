# Tatum Demo CLI

This repository contains a simple command‑line application that demonstrates how to interact with the Tatum REST API on the Ethereum testnet. The goal of the project is to show how quickly you can integrate Tatum’s blockchain services in Node.js and guide prospective users through the workflow of generating a wallet, deriving addresses and private keys, and inspecting balances. In a Solutions Engineering role, being able to build practical examples like this is key to articulating Tatum’s value to developers and product teams.

## Features

The CLI performs the following actions via Tatum’s API:

1. **Generate a new wallet** (mnemonic & extended public key) – calls the `GET /v3/ethereum/wallet` endpoint to return a mnemonic phrase and XPUB. Tatum’s documentation describes this as the starting point for creating deterministic wallets.
2. **Derive a private key** from a mnemonic and index – calls `POST /v3/ethereum/wallet/priv` to derive a private key for a given child address.
3. **Derive an address** from an XPUB and index – calls `GET /v3/ethereum/address/{xpub}/{index}` to generate a public address without exposing private data.
4. **Check the balance** of any Ethereum address – calls `GET /v3/ethereum/account/balance/{address}` and returns the balance in ETH.

Each of these functions corresponds directly to the examples provided in Tatum’s “Getting started with Ethereum REST API” guide, implemented in JavaScript using `axios`.

## Getting started

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or later) and npm installed on your machine.
* A free Tatum API key. You can sign up and create an API key on the [Tatum dashboard](https://dashboard.tatum.io). The free plan allows up to five requests per second and is sufficient for this demo.

### Installation

1. Clone the repository or download the source code.
2. Install dependencies:

   ```bash
   cd tatum-demo
   npm install
   ```

3. Copy the `.env.example` file to `.env` and replace `YOUR_TATUM_API_KEY` with your API key:

   ```bash
   cp .env.example .env
   # then edit .env and insert your key
   ```

### Running the CLI

Start the application with npm:

```bash
npm start
```

You will be presented with a menu of actions. Select an option and follow the prompts. Generated mnemonics and private keys are printed to the console – ensure you store them securely. When deriving addresses or private keys, provide the XPUB or mnemonic from a previously created wallet and choose the desired index (starting at 0).

## How it works

The CLI uses [`axios`](https://github.com/axios/axios) for HTTP requests and [`inquirer`](https://github.com/SBoudrias/Inquirer.js) for interactive prompts. Each menu option wraps a call to one of Tatum’s REST endpoints. The API key is sent in the `x-api-key` header on every request. If the key is missing or invalid, Tatum returns an authentication error. The script handles API errors gracefully and displays relevant messages to the user.

The Ethereum testnet (Sepolia) is used by default, but the `BASE_URL` in `index.js` can be changed to point at another supported blockchain simply by replacing `ethereum` in the path. This highlights one of Tatum’s strengths: you can develop multi‑chain applications with minimal changes.

## Why this project matters

Solutions Engineers at Tatum are expected to bridge the gap between sales and engineering. They must be able to communicate effectively with developers, build demo apps quickly, and guide prospects through the integration process. This project demonstrates the ability to:

* Understand and implement Tatum’s API endpoints.
* Write clean, developer‑friendly code with documentation.
* Build tooling that can be easily adapted for different blockchains.
* Provide clear instructions and error handling for non‑experts.

By following Tatum’s official examples and translating them into an interactive JavaScript application, this repo showcases both technical fluency and a focus on developer experience.

## Next steps

To extend this demo, consider adding:

* **Transaction sending** – estimate gas and send testnet transactions to other addresses. Tatum provides endpoints for gas estimation and transaction submission in the same guide.
* **Support for additional chains** – allow the user to choose between Ethereum, Polygon, Bitcoin and other blockchains at runtime.
* **Web interface** – wrap the functionality in a simple web UI using React or Express to showcase full‑stack capabilities.

These enhancements would demonstrate deeper integration with Tatum’s features and provide even more value for prospective customers.
