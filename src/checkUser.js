import { Auth } from 'aws-amplify';

const checkUser = async (updateUser) => {
    try {
        const userData = await Auth.currentSession()

     
      
        console.log(userData);

        // Complex destructuring.. E.g. Nested properties..could use userData.idToken.payload
        const { idToken: { payload }} = userData;

        // Use JS property indexer operator, Similar tp array index operator... 
        //
        // The &&  is the 'boolean short-Circut'
        //
        // includes() is an array method, much like map(), filter(), reduce()...
        const isAuthorized =
            payload['cognito:groups'] 
            && payload['cognito:groups'].includes('Admin');

            updateUser({
                username: payload['cognito:username']
                , isAuthorized //isAuthorized: isAuthorized shorthand syntax...
            });

        }
    catch (err) {
        console.error(err);
        updateUser({});
    }

}

export default checkUser;