import fetch from "node-fetch";

export const getUserDetails = async (context) => {
    return await fetch(
        `http://${process.env.USER_AUTH_SERVER_IP}:5000/userDtl`,
        {
            method: 'POST',
            body: JSON.stringify(context),
            headers: {'Content-Type': 'application/json'}
        }
    );
}