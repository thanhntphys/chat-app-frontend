
import { userLoginReducers } from '../../redux/reducers/userReducers'

describe('reducer login', () => {

    test('should be return initial state', () => {
        expect(userLoginReducers(undefined, {})).toEqual({
            isLoggedIn: false,
            name: '',
            room: '',
        });

    });
    test('should be loggin  ', () => {
        const mockActionLogin = {
            type: "USERS_LOGGIN",
            payload: {
                room: 'room1',
                name: 'name1'

            }
        }

        expect(userLoginReducers(undefined, mockActionLogin)).toEqual({
            isLoggedIn: true,
            room: 'room1',
            name: 'name1',
        });

    });

    test('should be loggin  ', () => {
        const mockActionLogout = {
            type: "USERS_LOGOUT",
        }

        expect(userLoginReducers(undefined, mockActionLogout)).toEqual({
            isLoggedIn: false,
            room: '',
            name: '',
        });

    });
});

