export type EventMap<T extends EventTarget> = T extends HTMLVideoElement
  ? HTMLVideoElementEventMap
  : T extends HTMLBodyElement
    ? HTMLBodyElementEventMap
    : T extends HTMLMediaElement
      ? HTMLMediaElementEventMap
      : T extends SVGSVGElement
        ? SVGSVGElementEventMap
        : T extends Document
          ? DocumentEventMap
          : T extends HTMLElement
            ? HTMLElementEventMap
            : T extends IDBOpenDBRequest
              ? IDBOpenDBRequestEventMap
              : T extends MathMLElement
                ? MathMLElementEventMap
                : T extends OfflineAudioContext
                  ? OfflineAudioContextEventMap
                  : T extends ServiceWorker
                    ? ServiceWorkerEventMap
                    : T extends SVGElement
                      ? SVGElementEventMap
                      : T extends Window
                        ? WindowEventMap
                        : T extends Worker
                          ? WorkerEventMap
                          : T extends XMLHttpRequest
                            ? XMLHttpRequestEventMap
                            : T extends AbortSignal
                              ? AbortSignalEventMap
                              : T extends AbstractWorker
                                ? AbstractWorkerEventMap
                                : T extends Animation
                                  ? AnimationEventMap
                                  : T extends AudioScheduledSourceNode
                                    ? AudioScheduledSourceNodeEventMap
                                    : T extends AudioWorkletNode
                                      ? AudioWorkletNodeEventMap
                                      : T extends BaseAudioContext
                                        ? BaseAudioContextEventMap
                                        : T extends BroadcastChannel
                                          ? BroadcastChannelEventMap
                                          : T extends DocumentAndElementEventHandlers
                                            ? DocumentAndElementEventHandlersEventMap
                                            : T extends Element
                                              ? ElementEventMap
                                              : T extends EventSource
                                                ? EventSourceEventMap
                                                : T extends FileReader
                                                  ? FileReaderEventMap
                                                  : T extends FontFaceSet
                                                    ? FontFaceSetEventMap
                                                    : T extends GlobalEventHandlers
                                                      ? GlobalEventHandlersEventMap
                                                      : T extends IDBDatabase
                                                        ? IDBDatabaseEventMap
                                                        : T extends IDBRequest
                                                          ? IDBRequestEventMap
                                                          : T extends IDBTransaction
                                                            ? IDBTransactionEventMap
                                                            : T extends MediaDevices
                                                              ? MediaDevicesEventMap
                                                              : T extends MediaKeySession
                                                                ? MediaKeySessionEventMap
                                                                : T extends MediaQueryList
                                                                  ? MediaQueryListEventMap
                                                                  : T extends MediaRecorder
                                                                    ? MediaRecorderEventMap
                                                                    : T extends MediaSource
                                                                      ? MediaSourceEventMap
                                                                      : T extends MediaStream
                                                                        ? MediaStreamEventMap
                                                                        : T extends MediaStreamTrack
                                                                          ? MediaStreamTrackEventMap
                                                                          : T extends MessagePort
                                                                            ? MessagePortEventMap
                                                                            : T extends Notification
                                                                              ? NotificationEventMap
                                                                              : T extends PaymentRequest
                                                                                ? PaymentRequestEventMap
                                                                                : T extends Performance
                                                                                  ? PerformanceEventMap
                                                                                  : T extends PermissionStatus
                                                                                    ? PermissionStatusEventMap
                                                                                    : T extends PictureInPictureWindow
                                                                                      ? PictureInPictureWindowEventMap
                                                                                      : T extends RTCDTMFSender
                                                                                        ? RTCDTMFSenderEventMap
                                                                                        : T extends RTCDataChannel
                                                                                          ? RTCDataChannelEventMap
                                                                                          : T extends RTCDtlsTransport
                                                                                            ? RTCDtlsTransportEventMap
                                                                                            : T extends RTCIceTransport
                                                                                              ? RTCIceTransportEventMap
                                                                                              : T extends RTCPeerConnection
                                                                                                ? RTCPeerConnectionEventMap
                                                                                                : T extends RTCSctpTransport
                                                                                                  ? RTCSctpTransportEventMap
                                                                                                  : T extends RemotePlayback
                                                                                                    ? RemotePlaybackEventMap
                                                                                                    : T extends ScreenOrientation
                                                                                                      ? ScreenOrientationEventMap
                                                                                                      : T extends ServiceWorkerContainer
                                                                                                        ? ServiceWorkerContainerEventMap
                                                                                                        : T extends ServiceWorkerRegistration
                                                                                                          ? ServiceWorkerRegistrationEventMap
                                                                                                          : T extends ShadowRoot
                                                                                                            ? ShadowRootEventMap
                                                                                                            : T extends SourceBuffer
                                                                                                              ? SourceBufferEventMap
                                                                                                              : T extends SourceBufferList
                                                                                                                ? SourceBufferListEventMap
                                                                                                                : T extends SpeechSynthesis
                                                                                                                  ? SpeechSynthesisEventMap
                                                                                                                  : T extends SpeechSynthesisUtterance
                                                                                                                    ? SpeechSynthesisUtteranceEventMap
                                                                                                                    : T extends TextTrack
                                                                                                                      ? TextTrackEventMap
                                                                                                                      : T extends TextTrackCue
                                                                                                                        ? TextTrackCueEventMap
                                                                                                                        : T extends TextTrackList
                                                                                                                          ? TextTrackListEventMap
                                                                                                                          : T extends VisualViewport
                                                                                                                            ? VisualViewportEventMap
                                                                                                                            : T extends WebSocket
                                                                                                                              ? WebSocketEventMap
                                                                                                                              : T extends WindowEventHandlers
                                                                                                                                ? WindowEventHandlersEventMap
                                                                                                                                : T extends XMLHttpRequestEventTarget
                                                                                                                                  ? XMLHttpRequestEventTargetEventMap
                                                                                                                                  : Record<
                                                                                                                                      string,
                                                                                                                                      Event
                                                                                                                                    >;

export type EventType<T extends EventTarget> = Extract<
  keyof EventMap<T>,
  string
>;
