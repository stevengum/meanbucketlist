app.factory('messagesFactory', ['$http','$location', ($http, $location) => {
    function messagesFactory() {

        // sendMessage to be refactored

        this.sendMessage = (msg, userId, callback) => {
                data = {/* userId = userId*/};
                data.content = msg.content,
                $http.post(`/message/${userId}`, data).then(res => {
                    if (!res){
                        console.log(`No response received from the back-end! Redirecting to Dashboard`);
                        $location.url('/dashboard');

                    } else if(res.data.error){
                        console.log("Error received from back-end: ", res.data.error);
                        $location.url('/dashboard');

                    } else {
                        $location.url('/dashboard');
                        callback(res);
                    }
                });
        };
        //end sendMessage
        this.listMessages = function(callback) {
            $http.get('/user/messages')
            .then(function(res) {
                if(res.data.error) {
                    console.log(res.data.error);
                } else {
                    callback(res.data);
                }
            })
        }
    }
    return new messagesFactory();

}])
