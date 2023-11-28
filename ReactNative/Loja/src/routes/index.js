import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../Pages/Welcome';
import Sign from '../Pages/Sign';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import Detail from '../Pages/Detail';
import Admin from '../Pages/Admin'

const Stack = createNativeStackNavigator();

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
            <Stack.Screen
                name='Detail'
                component={Detail}
            >

            </Stack.Screen>
            <Stack.Screen
            name='Admin'
            component={Admin}>

            </Stack.Screen>
        </Stack.Navigator>
    )
}