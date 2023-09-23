//instalar biblioteca(yarn add uuid ; yarn add @types/uuid -D)

import {v4 as uuid} from 'uuid'

type SigInRequestData = {
    username:string;
	password:string;
	}
	
export async function SignInRequest(data: SigInRequestData){
  return{
    token:uuid(),
	user:{
	  username: 'jefdhamer',
	  }
  }
}

export async function recoverUserInformation(){
  return{
    user:{
	  username: 'jefdhamer',
	}}
}