## What is this project, exactly?

This project allows you to interface with an LED display board. The primary purpose is to display messages. Some demos of the available characters and symbols are provided and custom message content and speed are also supported. Messaging operations can be run instantaneously or scheduled for a time in the future. Scheduled messages are displayed and can be deleted before they are sent to the board. This code also works for devices without hardware interface capabilities by means of a graphical display that represents an LED board.

## How does it work?

When running operations through the Operations page of this application, data about the desired operation is sent to Amazon Web Service (AWS)'s Internet of Things (IoT) Core software. This data consists of a payload: a `JSON` object with various fields representing the operation, and a topic: a location to send that data. When data is sent to this topic in the cloud, it is received on the other side by a local device: a laptop or Raspberry Pi. Code running on this local devices extracts data from the payload it was sent and uses it to determine the desired operation. Then, depending on the operating system of the device, messages are displayed either on an LED display board or a graphical display.



### Components

This project is made up of four key sub-projects:
- [Neo](https://github.com/alyoshenka/neo): Local device application that can receive messages from the cloud
- [Neopolitan](https://github.com/alyoshenka/neopolitan): Drawing library
- [Dibiasky](https://github.com/alyoshenka/dibiasky): Web application that facilitates communication between the cloud and a local device (*You're using this right now!*)
- [AWS Code](https://gist.github.com/alyoshenka/eefe9ad7b53b275c895f0dbe696694ec): Authentication, message routing logic, scheduled operation storage

### Architecture

add diagrams

### No but really, *how does it work*?

## Additional Reading
- [Developer Log](https://github.com/alyoshenka/neo/wiki/Developer-Log:-Alexi): See an hourly breakdown of one contributor's work on this project
- [Project Board](https://github.com/users/alyoshenka/projects/2): In progress issues
- [Initial Project Spec](https://github.com/alyoshenka/neo/wiki/New-Teammate-Onboarding#alexis-component)