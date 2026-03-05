#!/usr/bin/env node

const axios = require('axios');
const inquirer = require('inquirer');
require('dotenv').config();

const TATUM_API_KEY = process.env.TATUM_API_KEY;
const BASE_URL = process.env.BASE_URL || 'https://api-eu1.tatum.io';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': TATUM_API_KEY,
    'Content-Type': 'application/json'
  }
});

async function generateWallet() {
  const res = await client.get('/v3/ethereum/wallet');
  console.log('Mnemonic:', res.data.mnemonic);
  console.log('XPUB:', res.data.xpub);
}

async function derivePrivateKey() {
  const answers = await inquirer.prompt([
    { name: 'mnemonic', message: 'Enter mnemonic:', type: 'password' },
    { name: 'index', message: 'Derivation index:', type: 'number', default: 0 }
  ]);
  const res = await client.post('/v3/ethereum/wallet/priv', {
    mnemonic: answers.mnemonic,
    index: answers.index
  });
  console.log('Private key:', res.data.key);
}

async function deriveAddress() {
  const answers = await inquirer.prompt([
    { name: 'xpub', message: 'Enter XPUB:', type: 'input' },
    { name: 'index', message: 'Derivation index:', type: 'number', default: 0 }
  ]);
  const res = await client.get(`/v3/ethereum/address/${answers.xpub}/${answers.index}`);
  console.log('Address:', res.data);
}

async function checkBalance() {
  const answers = await inquirer.prompt([
    { name: 'address', message: 'Enter address:', type: 'input' }
  ]);
  const res = await client.get(`/v3/ethereum/account/balance/${answers.address}`);
  console.log('Balance:', res.data.balance);
}

async function main() {
  const actions = [
    { name: 'Generate new wallet', value: generateWallet },
    { name: 'Derive private key from mnemonic', value: derivePrivateKey },
    { name: 'Derive address from XPUB', value: deriveAddress },
    { name: 'Check balance', value: checkBalance },
    { name: 'Exit', value: null }
  ];

  while (true) {
    const { fn } = await inquirer.prompt({
      name: 'fn',
      type: 'list',
      message: 'Choose an action:',
      choices: actions
    });

    if (!fn) break;

    try {
      await fn();
    } catch (err) {
      console.error('Request failed:', err.response?.data || err.message);
    }
    console.log('\n');
  }
}

main();
