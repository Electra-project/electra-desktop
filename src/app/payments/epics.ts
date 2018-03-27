import { WalletAddress } from 'electra-js'
import { Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import * as ActionNames from './action-names'
import { SendEca } from './types'

export function sendECA(action$: ActionsObservable<any>, store: Store<any>):
  Observable<any> {
  return action$.ofType(ActionNames.SEND_ECA)
    .map((action: SendEca) => action.payload)
    .map(async (payload: any) => {
      const { amount, to } = payload

      return ElectraJsMiddleware.send(parseFloat(amount), to)
    })
    .mergeMap((promise: Promise<void>) =>
      Observable
        .fromPromise(promise)
        .map(() => ({
          type: ActionNames.SEND_ECA_SUCCESS
        }))
        .catch((error: Error) => {
          console.error(error.message)

          return Observable.of({
            type: ActionNames.SEND_ECA_FAIL
          })
        })
    )
}

export function getAddresses(action$: ActionsObservable<any>, store: Store<any>):
  Observable<any> {
  return action$.ofType(ActionNames.GET_ADDRESSES)
    .map(() => ElectraJsMiddleware.allAddresses)
    .flatMap((addresses: WalletAddress[]) => Observable.of(
      { payload: addresses, type: ActionNames.GET_ADDRESSES_SUCCESS }
    ))
}
