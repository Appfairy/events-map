# Events Map

Events Map is a utility module which aims to provide you with a convenient way to register events and manager them later on. Event handlers can automatically be bound to a context and later on be unregistered without event providing their bound version.

## Example

```js
import EventsMap from 'events-map';

class Component {
  constructor() {
    // Here we create a new instance of the events map, and we invoke it with the current
    // context, thus, any event handler which would be registered from now on, will be
    // bound automatically to the current context
    this.events = new EventsMap(this);

    this.events.on(document, 'mousedown', this.handleMousedown);
  }

  handleMousedown() {
    // Note that the context represents the current component
    this.mousedownTime = Date.now();

    this.events.on(document, 'mouseup', this.handleMouseup);
  }

  handleMouseup() {
    this.mouseupTime = Date.now();

    // Will unregister only the registered 'mouseup' event of the current component
    this.events.off(document, 'mouseup');

    const mouseholdTime = this.mouseupTime - this.mousedownTime;

    console.log(`mouse held for ${mouseholdTime}ms`);
  }

  dispose() {
    // All registered event listeners can automatically be unregistered by simply not
    // specifying anything when calling the 'off()' method
    this.events.off();
  }
}

export default Component;
```

Using Speech Tree you can:

- Register events for incoming speech based on its content.
- Register a sequence of events which should follow each other in a specific order.
- Analyze a sentence using user-defined methods.
- Label a sentence against the server using a user-defined classifier.

Speech Tree is not supposed to provide you with a full robust solution, but rather an extensible one which can be changed based on the user's desires and needs.

## API

### EventsMap([Object]) class

**description**: The events mapping class which will take care of registering and unregistering events bound to a specified context. Accepts an optional argument which specifies the context of registered events. If not provided, will default to the global `window` object.

**methods**:

- `on(EventTarget, String, Function, [Boolean])` - Accepts the event target, event name, event handler and an optional capture usage specifier which will default to `false`. Will register the specified event to the specified event target.
- `once(EventTarget, String, Function, [Boolean])` - Same as the `on()`, only registers a one-time event listener which will be unregistered right after its first invocation.
- `off([EventTarget|Boolean], [String|Boolean], [Function|Boolean], [Boolean])` - Unregister an event listener based on specified parameters. If all parameters were provided, it will unregister the specified event as usual. If no event handler was provided, will unregister all the event handlers which match the other parameters. If no event name was provided, will unregister all the event names which match the other parameters. If not event target was provided, will unregister all the events completely. The last argument is a flag which specifies capture usage.
- `emit(EventTarget, String)` - Emits an event which will trigger the event name belonging to the specified event target.

## Download

The source is available for download from [GitHub](http://github.com/Appfairy/events-map). Alternatively, you can install using Node Package Manager (`npm`):

    npm install events-map

## License

MIT
