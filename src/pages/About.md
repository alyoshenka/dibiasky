## What is this project, exactly?

This project allows you to interface with an LED display board. The primary purpose is to display messages. Some demos of the available characters and symbols are provided and custom message content and speed are also supported. Messaging operations can be run instantaneously or scheduled for a time in the future. Scheduled messages are displayed and can be deleted before they are sent to the board. This code also works for devices without hardware interface capabilities by means of a graphical display that represents an LED board.

## Why does it exist?

## How does it work?

When running operations through the Operations page of this application, data about the desired operation is sent to Amazon Web Service (AWS)'s Internet of Things (IoT) Core software. This data consists of a payload: a `JSON` object with various fields representing the operation, and a topic: a location to send that data. When data is sent to this topic in the cloud, it is received on the other side by a local device: a laptop or Raspberry Pi. Code running on this local devices extracts data from the payload it was sent and uses it to determine the desired operation. Then, depending on the operating system of the device, messages are displayed either on an LED display board or a graphical display.

### Components

This project is made up of four key sub-projects:
- [Neo](https://github.com/alyoshenka/neo): Local device application that can receive messages from the cloud
- [Neopolitan](https://github.com/alyoshenka/neopolitan): Drawing library
- [Dibiasky](https://github.com/alyoshenka/dibiasky): Web application that facilitates communication between the cloud and a local device (*You're using this right now!*)
- [AWS Code](https://gist.github.com/alyoshenka/eefe9ad7b53b275c895f0dbe696694ec): Authentication, message routing logic, scheduled operation storage

### Architecture



### No but really, *how does it work*?

`Dibiasky` utilizes AWS Amplify's PubSub capabilities to interact with IoT Core and send MQTT messages. It also utilizes Amplify for Authentication using IAM and Cognito. Data objects are published to various IoT Core topics. For an explanation of the system designed for organizing topics and payloads, see the link below. A local device runs `Neo`, which subscribes to a specific set of these topics. When data is published from the webpage to a specific topic, it is received by the local device if it has subscribed to that topic, and vice versa. When subscribing to a topic, a callback function is specified. Upon data being published to a topic then received on the other side, that callback function is run with the data sent as an argument. This data is interpreted by `Neo`. Most commonly, the intent is for a message to be displayed on the board. When it is indicated by the payload that this is the case, `Neo` utilizes our custom drawing library, `Neopolitan` to interface with the LED board. This code contains a check for the operating system of the device, which is used to determine whether the supporting infrastructure for display on a physical LED board or display on a graphical display is available. `Neopolitan` contains definitions for supported characters, which are defined as indicies in an array, as the board is simply an array of pixels. Character-by-character, message strings are converted to an array of data that can be interpreted by the board. 

When scheduling messages, the input operation data is sent to a topic. On the AWS side, there is a routing rule attached to this topic that selects desired fields from the data and sends them to a Lambda function. This function verifies that the data is valid then adds the scheduled operation to a database so that it can be displayed in the web application, as well as initiates a Step Function that will wait until the specified time and then send the operation command back to `Neo`. At this point, the operation works just as if it had been run instantaneously.

## Additional Reading
- [Developer Log](https://github.com/alyoshenka/neo/wiki/Developer-Log:-Alexi): See an hourly breakdown of one contributor's work on this project
- [Project Board](https://github.com/users/alyoshenka/projects/2): In progress issues
- [Initial Project Spec](https://github.com/alyoshenka/neo/wiki/New-Teammate-Onboarding#alexis-component): Outline of the original goals and plans for the project
- [Topics and Payloads](https://github.com/alyoshenka/neo/wiki/Topics-and-Payloads): Design for message-passing system