import { Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import Wallet from '../../middlewares/ElectraJs/wallet'
import WebServices from '../../middlewares/ElectraJs/webServices'
import * as ElectraActionNames from './../electra/action-names'
import { ElectraActions} from './../electra/types'
import * as OverviewActionNames from './action-names'
import { GlobalBalanceObservable, GlobalBalanceOtherObservable, OverviewActions } from './types'

const MAX_DECIMAL_PLACES: number = 8
const DELAY: number = 1000
const BTC: 'BTC' = 'BTC'

export function getGlobalBalance(action$: ActionsObservable<OverviewActions>, store: Store<any>):
  Observable<GlobalBalanceObservable> {
    return action$.ofType(OverviewActionNames.GET_GLOBAL_BALANCE, ElectraActionNames.GENERATE_HARD_WALLET_SUCCESS)
      .map(async () => Wallet.getBalance())
      .debounceTime(DELAY)
      .switchMap((promise: Promise<number>) =>
      Observable
      .fromPromise(promise)
      .map((globalBalance: number) => ({
        payload: globalBalance,
        type: OverviewActionNames.GET_GLOBAL_BALANCE_SUCCESS
      }))
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.log(error.message)

        return Observable.of({
        type: OverviewActionNames.GET_GLOBAL_BALANCE
      })
    })
  )
}

export function getCurrentPriceUSD(action$: ActionsObservable<OverviewActions>, store: Store<any>):
  Observable<GlobalBalanceOtherObservable> {
    return action$.ofType(OverviewActionNames.GET_CURRENT_PRICE_USD)
    .map(async () => WebServices.getCurrentPriceIn())
    .mergeMap((promise: Promise<number>) =>
      Observable
        .fromPromise(promise)
        .map((currentPriceUSD: number) => ({
          payload: currentPriceUSD.toFixed(MAX_DECIMAL_PLACES),
          type: OverviewActionNames.GET_CURRENT_PRICE_USD_SUCCESS
        }))
        .catch((error: Error) => Observable.of({
          type: OverviewActionNames.GET_CURRENT_PRICE_USD_FAIL
        })
      )
    )
}

export function getCurrentPriceBTC(action$: ActionsObservable<OverviewActions>, store: Store<any>):
  Observable<GlobalBalanceOtherObservable> {
    return action$.ofType(OverviewActionNames.GET_CURRENT_PRICE_BTC)
    .map(async () => WebServices.getCurrentPriceIn(BTC))
    .mergeMap((promise: Promise<number>) =>
      Observable
        .fromPromise(promise)
        .map((currentPriceBTC: number) => ({
          payload: currentPriceBTC.toFixed(MAX_DECIMAL_PLACES),
          type: OverviewActionNames.GET_CURRENT_PRICE_BTC_SUCCESS
        }))
        .catch((error: Error) => Observable.of({
          type: OverviewActionNames.GET_CURRENT_PRICE_BTC_FAIL
        })
      )
    )
}
