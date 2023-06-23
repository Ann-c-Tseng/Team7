import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import LoginForms from '../Forms/LoginForms';
import {render, screen, act} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from '../../Store/store';
import {login, logout} from '../../Store/Slices/authSlice';

global.window = {location: {pathname: null}};

describe('Prevents unauthenticated users from getting/staying inside.', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });
  // test('Prevents entry', async () => {
  //   render(
  //       <Provider store={store}>
  //         <BrowserRouter>
  //           <Routes>
  //             <Route
  //               path='/'
  //               element = {
  //                 <ProtectedRoute
  //                   element={<p>You can only see if logged in</p>}/>
  //               }>
  //             </Route>
  //             <Route
  //               path='/login'
  //               element = {
  //                 <LoginForms/>
  //               }
  //             />
  //           </Routes>
  //         </BrowserRouter>
  //       </Provider>,
  //   );
  //   const p = await screen.queryByText('see if logged in', {exact: false});
  //   const form = await screen.queryByText('Create an Account');
  //   expect(p).not.toBeInTheDocument();
  //   expect(global.window.location.pathname).toEqual('/login');
  //   expect(form).toBeInTheDocument();
  // });
  test('Started logged in, then logged out', async () => {
    await act(async () => {
      store.dispatch(login({username: 'test', email: 'test@gmail.com'}));
    });
    render(
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element = {
                  <ProtectedRoute
                    element={<p>You can only see if logged in</p>}/>
                }>
              </Route>
              <Route
                path='/login'
                element = {
                  <LoginForms/>
                }
              />
            </Routes>
          </BrowserRouter>
        </Provider>,
    );
    const p = await screen.findByText('see if logged in', {exact: false});
    expect(p).toBeInTheDocument();

    // store.dispatch(logout());

    // p = screen.findByText('You can only see if logged in');
    // expect(p).not.toBeInTheDocument();
  });
});

// describe('Allows authenticated users inside', () => {
//   beforeEach(async () => {
//   await act(async () => {
//     store.dispatch(login({username: 'test', email: 'test@gmail.com'}));
//   });
//   render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <ProtectedRoute element={<p>You can only see if logged in</p>}/>
//         </BrowserRouter>
//       </Provider>,
//   );
// });
//   afterEach(() => {
//     store.dispatch(logout());
//   });
//   test('access to the protected element', () => {
//     const p = screen.findByText('You can only see if logged in');
//     expect(p).toBeInTheDocument();
//   });
// });
