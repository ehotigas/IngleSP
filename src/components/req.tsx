export const ReqTest = async () => {
    let credentials = JSON.stringify({
        "username": "teste2@gmail.com",
        "password": "12345678"
    });

    const response = await Promise.resolve(
        fetch(
            'http://ec2-3-95-171-50.compute-1.amazonaws.com/users/2/',
            // {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: credentials
            // }
        )
    );
    const data = await response.json();
    console.log(data);
    return (
        <div>
            {/* {data.username} */}
            <br/>
            {/* {data.password} */}
        </div>
    );
}