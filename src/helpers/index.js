import Future from 'fluture'
import request from 'request-fluture'
import { env as flutureEnv } from 'fluture-sanctuary-types'
import { create, env } from 'sanctuary'

const S = create({
  checkTypes: true, 
  env: env.concat(flutureEnv)
})

export {
 Future,
 request,
 S
}
