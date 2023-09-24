const readyPayload = (data) => {
    const phone = data && data.phone ? data.phone : "01700000000";
    const message = data && data.message ? data.message : "Test message";

    return {
  
        "attachments":[
           {
              "fallback":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
              "pretext":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
              "color":"#D00000",
              "fields":[
                 {
                  "title":"Mobile",
                  "value":phone,
                  "short":false
               },
               {
                "title":"Message",
                "value":message,
                "short":false
             },
              ]
           }
        ]
     }
    };

module.exports = {readyPayload };
