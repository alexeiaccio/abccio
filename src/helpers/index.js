import Future from 'fluture'
import request from 'request-fluture'
import { env as flutureEnv } from 'fluture-sanctuary-types'
import { create, env } from 'sanctuary'
import $ from 'sanctuary-def'

const S = create({
  checkTypes: true, 
  env: env.concat(flutureEnv)
})

export const {
  compose, flip, fromMaybe, get, gt, ifElse, 
  is, joinWith, map, pipe, prop, splitOn,test, unless
} = S

export {
 Future,
 request,
 S,
}

export const hasLength = compose(gt(0))(prop('length'))
export const futureOfArray = compose(Future.of)(Array.from)

const cyrilicToLatin = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

const trslt = library => 
  unless(test(/[a-zA-Z0-9]/))(
    pipe([
      splitOn(''),
      map(flip(get(is($.String)))(library)),
      map(fromMaybe('')),
      joinWith('')
    ])
  )

export const fromCyrilicToLatin = trslt(cyrilicToLatin)