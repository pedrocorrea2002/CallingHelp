import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../screens/Home';
import {Details} from '../screens/Details';
import {Register} from '../screens/Register';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="home" component={Home}/>
            <Screen name="new" component={Register}/>
            <Screen name="details" component={Details}/>
        </Navigator>
    )
}

export function InitialRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="signIn" component={SignIn}/>
            <Screen name="signUp" component={SignUp}/>
        </Navigator>
    )
}

