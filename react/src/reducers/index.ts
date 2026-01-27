
export const initialAuth = {cu: null};

export const authReducer = (state:object, action:object ) => 
{
    if("type" in action && "value" in action ){

        switch(action.type) {
    
            case "loggedIn":
                console.log('logging in')
                return {...state, loggedIn: true, cu: action?.value }
            case "loggedOut":
                console.log('logging out')
                return {...state, loggedIn:false, cu: action?.value}
            default:
                throw new Error('Unknown action: '+ action.type)
        }
    }
     throw new Error("no action types");
}
