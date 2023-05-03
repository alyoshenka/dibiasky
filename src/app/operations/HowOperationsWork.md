# How Operations Work

## How do we query for the operations made available to us from IoT devices?

When the application starts, the `AvailableOperations` component subscribes to the `topics/resHubbleOperations` topic. This allows available operations to be populated when there is a message sent to that topic by another device. Additionally, the application waits until it is connected to AWS and then publishes to `topics.reqHubbleOperations` to request that the available operations be sent. This way, available operations can be initialized regardless of whether the web application or external device is started first. 

## How do we allow input to specify operations/settings for these devices?

Available operations, once initialized, appear in a dropdown. Once an operation is selected, it can be run with a button. The (currently) only different operation is when the Neopolitan display is updated, because parameters are required. In this case, the operation payload that is originally sent to this application contains the options that may be specified. These options appear (currently) as text inputs. The input text is attached to the payload that will be sent to the device that handles the operation.

This system is not the most amazing, yet.

## How do we send this data to the requisite devices?

When the selected operation button is clicked, the selected operation's payload is checked through a function `mapCommandToOperation` that then dispatches (publishes to a topic) on the payload.