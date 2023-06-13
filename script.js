let socket = null;

//connect("http://localhost:9981")

    function connect(address) {
      // Connect to ProtoPie Communication Server
      socket = io(address, {transports: ['websocket']});
      console.log("Connecting to ", address);

      // Once connected, it should send 'pcs-app-register' event with name
      socket.on('connect', function () {
        socket.emit('ppBridgeApp', {
          name: 'Webapp',
        });

        $('.state-connecting').hide();
        $('.state-connected').show();

        console.log('Connected');
      });

      // Event 'ppMessage' are emitted when player send a message.
      // Arguments contains 'messageId' and optionally 'value' fields.
      socket.on('ppMessage', function (args) {
        const messageId = args.messageId;
        const value = args.value;

        receiveValues(messageId, value);

        let text = new Date().toLocaleTimeString() + ' ' + messageId;
        if (value !== null && value !== undefined & value !== '') {
          text += '(' + value + ')';
        }

        let messages = document.getElementById('messages');
        $('<div>').text(text).appendTo(messages);
       // messages.scrollTo(0, messages.scrollHeight);
        
      });
    }

    function sendMessage(messageId, value) {
      // In order to send a message to players, emit 'ppMessage' with messageId and value(optional).
      socket.emit('ppMessage', {
        messageId: messageId,
        value: value
      });
    }
//automatically connect
    $('.state-initial').hide();
    $('.state-connecting').show();
    connect($('#address').val());

    $(function () {
      $('#form-connect').submit(function () {
        $('.state-initial').hide();
        $('.state-connecting').show();
        connect($('#address').val());
        return false;
      });

      $('#form-send').submit(function () {
        sendMessage($('#messageId').val(), $('#value').val());
        return false;
      });
    });