# How Operations Work

## How do we query for the operations made available to us from IoT devices?

When the application starts, the `AvailableOperations` component subscribes to the `topics/resHubbleOperations` topic. This allows available operations to be populated when there is a message sent to that topic by another device. Additionally, the application waits until it is connected to AWS and then publishes to `topics.reqHubbleOperations` to request that the available operations be sent. This way, available operations can be initialized regardless of whether the web application or external device is started first. 

## How do we allow input to specify operations/settings for these devices?

Available operations, once initialized, appear in a dropdown. Once an operation is selected, it can be run with a button. The (currently) only different operation is when the Neopolitan display is updated, because parameters are required. In this case, the operation payload that is originally sent to this application contains the options that may be specified. These options appear (currently) as text inputs. The input text is attached to the payload that will be sent to the device that handles the operation.

This system is not the most amazing, yet.

## How do we send this data to the requisite devices?

When the selected operation button is clicked, the selected operation's payload is checked through a function `mapCommandToOperation` that then dispatches (publishes to a topic) on the payload.

## How do the components manage state?
This system in particular is what probably needs to be redesigned. So long as options can be input by the user and then accessed from the component that sends the payload, anything works.

`AvailableOperations` displays the dropdown for operations that are available, as well as holds onto the `selectedOperation`, which holds the state for the currently selected operation. This state gets passed down to the `Operation` component, which contains a button that when clicked executes the functionality necessary to run that operation. This component also holds an `options` state, which is used to hold settings values for additional options within the operaton. `Operation` uses the selected operation it was passed as a prop to determine what function to call to "run" that operation. Additionally, if the `selectedOperation` is an update operation, it displays the `UpdateOperation` component, which allows input. `UpdateOperation` is passed a `setOptionsParent` parameter, which when called updates the `options` state in the `Operation` component. `UpdateOperation` displays a list of `UpdateOperationValue` components, which are responsible for setting the individual input values. It also contains an `optionsDict` state, that holds onto these individual input values. The `UpdateOperationValue` component is passed an `updateOptionsDict` parameter that then updates the `optionsDict` in `UpdateOperation` to include the new value.
