SDK.analysticLogger = function(crawInfo) {
    console.log("3. redefined logger run");
    console.log(crawInfo);
	const data = {
		"adid" : crawInfo[0],
		"type" : crawInfo[1],
		"path" : crawInfo[2],
	};
	fetch("http://192.168.0.128:3001/saveLog", {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
    })
};

(function (s) {
    s.forEach(e => {
        console.log("2. backup function run");
        SDK.analysticLogger(e[0]);
    });
}(SDK.stack));
