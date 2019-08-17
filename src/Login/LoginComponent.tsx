import * as React from "react";
import { Firebase } from "../model/firebase";
import { useDispatch } from "react-redux";
import { routerActions } from "connected-react-router";

interface Props {
    firebase: Firebase;
}

export const LoginComponent = ({ firebase }: Props) => {
    const [errorMessage, setErrorMessage] = React.useState('');
    const dispatch = useDispatch();
    const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const res = firebase.auth.signInWithEmailAndPassword(data.get('email') as string, data.get('password') as string);
        res
        .then(() => {
            dispatch(routerActions.push("/"))
        })
        .catch(({message}) => {
            setErrorMessage(message)
        })
    }, [firebase])
    return <div className="bg-white-100 rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4 px-3 py-10 bg-gray-200 flex justify-center">
        <div className="w-full max-w-xs">
            {errorMessage && <div className='bg-red'>{errorMessage}</div>}
            <form className="bg-white-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="text" placeholder="Username" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign In</button>
                </div>
            </form>
        </div>
    </div>;
}