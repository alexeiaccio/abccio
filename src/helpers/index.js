import Future from 'fluture'
import request from 'request-fluture'
import { env as flutureEnv } from 'fluture-sanctuary-types'
import { create, env } from 'sanctuary'

const S = create({
  checkTypes: true, 
  env: env.concat(flutureEnv)
})

export const {
  compose, gt, ifElse, prop
} = S

export {
 Future,
 request,
 S,
}

export const hasLength = compose(gt(0))(prop('length'))
export const futureOfArray = compose(Future.of)(Array.from)