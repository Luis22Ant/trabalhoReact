import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from '../Pages/Welcome'
import Sign from '../Pages/Sign'
import Home from '../Pages/Home'
import Register from '../Pages/Register'

const Stack = createNativeStackNavigator();
if (__DEV__) {
    require('react-devtools');
}
export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={{ headerShown: false }}>

            </Stack.Screen>

            <Stack.Screen
                name='Sign'
                component={Sign}
                options={{ headerShown: false }}>
            </Stack.Screen>

            <Stack.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false }}>

            </Stack.Screen>

            <Stack.Screen
                name='Register'
                component={Register}
                options={{ headerShown: false }}>

            </Stack.Screen>
        </Stack.Navigator>
    )
}