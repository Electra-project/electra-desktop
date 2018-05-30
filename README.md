# Electra Wallet

Electron wallet for **Electra** blockchain

[![Github All Releases](https://img.shields.io/github/downloads/Electra-project/electra-desktop/total.svg?style=flat-square)](https://github.com/Electra-project/electra-desktop/releases)
[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![David](https://img.shields.io/david/Electra-project/electra-desktop.svg?style=flat-square)](https://david-dm.org/Electra-project/electra-desktop)
[![David](https://img.shields.io/david/dev/Electra-project/electra-desktop.svg?style=flat-square)](https://david-dm.org/InspiredBeings/electra-desktop)

[![NSP Status](https://nodesecurity.io/orgs/ivan-gabriele/projects/e8f9941a-7742-4aac-8754-931af71f1e3f/badge)](https://nodesecurity.io/orgs/ivan-gabriele/projects/e8f9941a-7742-4aac-8754-931af71f1e3f)

## Issues & Feedback

Please report any issue or provide your feedback [there](https://github.com/Electra-project/electra-desktop/issues).

## Contribute

### Getting Started

**Prerequisites**
* Node >= 9.4
* [Python v2](https://www.python.org/downloads/)
* Windows: [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools#readme)

**Installation**

    npm i

### Development

The development environment uses hot-reload.

    npm start

**Start with a brand new wallet**

This command will remove the Electra user directories (daemon & Electron ones) before starting.

    npm run start:new

**Validation**

    npm run validate

### Staging

The staging environment uses static files but let the web development console open.

    npm run start:stag

**Build an installable package**

    npm run package:stag

### Production

The production enviromment uses static files and doesn't allow the web development console.

    npm run start:prod

**Build an installable package**

    npm run package:prod

## Concepts

## Roadmap / Todo
- [x] Integrate Wallet Setup / On boarding Flow
- [x] Use Electra-Js for blockchain interaction
- Necessary features to complete
	- [ ] Add necessary views
	- [ ] Generate HD wallet
	- [ ] Receive ECA
	- [ ] Send ECA
	- [ ] Wallet locking/unlocking
- Good to have features:
	- [ ] Block explorer
	- [ ] ECA price feed
	- [ ] Social pay
