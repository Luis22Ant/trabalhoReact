import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Welcome from '../Pages/Welcome'
import Sign from '../Pages/Sign'

const Stack =  createNativeStackNavigator();

export default function Routes (){
    return (
<Stack.Navigator>
    <Stack.Screen
    name = 'Welcome'
    component={Welcome}
    options={{headerShown:false}}>

    </Stack.Screen>

    <Stack.Screen
    name = 'Sign'
    component={Sign}
    options={{headerShown:false}}>
    </Stack.Screen>
</Stack.Navigator>
    )
}