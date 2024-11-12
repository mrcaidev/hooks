import { useEffect, type DependencyList, type RefObject } from "react";
import { useLatest } from "./use-latest";

export type UseEventListenerOptions = AddEventListenerOptions & {
  extraDeps?: DependencyList;
};

/**
 * Listen to any events.
 */
export function useEventListener<
  Target extends EventTarget,
  Type extends EventType<Target>,
>(
  ref: RefObject<Target>,
  type: Type,
  callback: (event: EventMap<Target>[Type], target: Target) => void,
  options: UseEventListenerOptions = {},
) {
  const {
    capture = false,
    once = false,
    passive = false,
    extraDeps = [],
  } = options;

  const callbackRef = useLatest(callback);

  useEffect(() => {
    const target = ref.current;

    if (!target) {
      return;
    }

    const listener: EventListener = (event) =>
      callbackRef.current(event as EventMap<Target>[Type], target);

    target.addEventListener(type, listener, { capture, once, passive });
    return () => target.removeEventListener(type, listener);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, type, callbackRef, capture, once, passive, ...extraDeps]);
}

export type EventMap<Target extends EventTarget> =
  Target extends HTMLVideoElement // -> HTMLMediaElement -> HTMLElement -> Element -> Node -> EventTarget
    ? HTMLVideoElementEventMap
    : Target extends SVGSVGElement // -> SVGGraphicsElement -> SVGElement -> Element -> Node -> EventTarget
      ? SVGSVGElementEventMap
      : Target extends HTMLMediaElement // -> HTMLElement -> Element -> Node -> EventTarget
        ? HTMLMediaElementEventMap
        : Target extends HTMLBodyElement // -> HTMLElement -> Element -> Node -> EventTarget
          ? HTMLBodyElementEventMap
          : Target extends HTMLElement // -> Element -> Node -> EventTarget
            ? HTMLElementEventMap
            : Target extends MathMLElement // -> Element -> Node -> EventTarget
              ? MathMLElementEventMap
              : Target extends SVGElement // -> Element -> Node -> EventTarget
                ? SVGElementEventMap
                : Target extends ShadowRoot // -> DocumentFragment -> Node -> EventTarget
                  ? ShadowRootEventMap
                  : Target extends Document // -> Node -> EventTarget
                    ? DocumentEventMap
                    : Target extends Element // -> Node -> EventTarget
                      ? ElementEventMap
                      : Target extends IDBOpenDBRequest // -> IDBRequest -> EventTarget
                        ? IDBOpenDBRequestEventMap
                        : Target extends MIDIInput // -> MIDIPort -> EventTarget
                          ? MIDIInputEventMap
                          : Target extends OfflineAudioContext // -> AudioContext -> EventTarget
                            ? OfflineAudioContextEventMap
                            : Target extends XMLHttpRequest // -> XMLHttpRequestEventTarget -> EventTarget
                              ? XMLHttpRequestEventMap
                              : Target extends AbortSignal // -> EventTarget
                                ? AbortSignalEventMap
                                : Target extends Animation // -> EventTarget
                                  ? AnimationEventMap
                                  : Target extends AudioScheduledSourceNode // -> EventTarget
                                    ? AudioScheduledSourceNodeEventMap
                                    : Target extends AudioWorkletNode // -> EventTarget
                                      ? AudioWorkletNodeEventMap
                                      : Target extends BaseAudioContext // -> EventTarget
                                        ? BaseAudioContextEventMap
                                        : Target extends BroadcastChannel // -> EventTarget
                                          ? BroadcastChannelEventMap
                                          : Target extends EventSource // -> EventTarget
                                            ? EventSourceEventMap
                                            : Target extends FileReader // -> EventTarget
                                              ? FileReaderEventMap
                                              : Target extends FontFaceSet // -> EventTarget
                                                ? FontFaceSetEventMap
                                                : Target extends IDBDatabase // -> EventTarget
                                                  ? IDBDatabaseEventMap
                                                  : Target extends IDBRequest // -> EventTarget
                                                    ? IDBRequestEventMap
                                                    : Target extends IDBTransaction // -> EventTarget
                                                      ? IDBTransactionEventMap
                                                      : Target extends MIDIAccess // -> EventTarget
                                                        ? MIDIAccessEventMap
                                                        : Target extends MIDIPort // -> EventTarget
                                                          ? MIDIPortEventMap
                                                          : Target extends MediaDevices // -> EventTarget
                                                            ? MediaDevicesEventMap
                                                            : Target extends MediaKeySession // -> EventTarget
                                                              ? MediaKeySessionEventMap
                                                              : Target extends MediaQueryList // -> EventTarget
                                                                ? MediaQueryListEventMap
                                                                : Target extends MediaRecorder // -> EventTarget
                                                                  ? MediaRecorderEventMap
                                                                  : Target extends MediaSource // -> EventTarget
                                                                    ? MediaSourceEventMap
                                                                    : Target extends MediaStream // -> EventTarget
                                                                      ? MediaStreamEventMap
                                                                      : Target extends MediaStreamTrack // -> EventTarget
                                                                        ? MediaStreamTrackEventMap
                                                                        : Target extends MessagePort // -> EventTarget
                                                                          ? MessagePortEventMap
                                                                          : Target extends Notification // -> EventTarget
                                                                            ? NotificationEventMap
                                                                            : Target extends OffscreenCanvas // -> EventTarget
                                                                              ? OffscreenCanvasEventMap
                                                                              : Target extends PaymentRequest // -> EventTarget
                                                                                ? PaymentRequestEventMap
                                                                                : Target extends Performance // -> EventTarget
                                                                                  ? PerformanceEventMap
                                                                                  : Target extends PermissionStatus // -> EventTarget
                                                                                    ? PermissionStatusEventMap
                                                                                    : Target extends PictureInPictureWindow // -> EventTarget
                                                                                      ? PictureInPictureWindowEventMap
                                                                                      : Target extends RTCDTMFSender // -> EventTarget
                                                                                        ? RTCDTMFSenderEventMap
                                                                                        : Target extends RTCDataChannel // -> EventTarget
                                                                                          ? RTCDataChannelEventMap
                                                                                          : Target extends RTCDtlsTransport // -> EventTarget
                                                                                            ? RTCDtlsTransportEventMap
                                                                                            : Target extends RTCIceTransport // -> EventTarget
                                                                                              ? RTCIceTransportEventMap
                                                                                              : Target extends RTCPeerConnection // -> EventTarget
                                                                                                ? RTCPeerConnectionEventMap
                                                                                                : Target extends RTCSctpTransport // -> EventTarget
                                                                                                  ? RTCSctpTransportEventMap
                                                                                                  : Target extends RemotePlayback // -> EventTarget
                                                                                                    ? RemotePlaybackEventMap
                                                                                                    : Target extends ScreenOrientation // -> EventTarget
                                                                                                      ? ScreenOrientationEventMap
                                                                                                      : Target extends ServiceWorker // -> EventTarget
                                                                                                        ? ServiceWorkerEventMap
                                                                                                        : Target extends ServiceWorkerContainer // -> EventTarget
                                                                                                          ? ServiceWorkerContainerEventMap
                                                                                                          : Target extends ServiceWorkerRegistration // -> EventTarget
                                                                                                            ? ServiceWorkerRegistrationEventMap
                                                                                                            : Target extends SourceBuffer // -> EventTarget
                                                                                                              ? SourceBufferEventMap
                                                                                                              : Target extends SourceBufferList // -> EventTarget
                                                                                                                ? SourceBufferListEventMap
                                                                                                                : Target extends SpeechSynthesis // -> EventTarget
                                                                                                                  ? SpeechSynthesisEventMap
                                                                                                                  : Target extends SpeechSynthesisUtterance // -> EventTarget
                                                                                                                    ? SpeechSynthesisUtteranceEventMap
                                                                                                                    : Target extends TextTrack // -> EventTarget
                                                                                                                      ? TextTrackEventMap
                                                                                                                      : Target extends TextTrackCue // -> EventTarget
                                                                                                                        ? TextTrackCueEventMap
                                                                                                                        : Target extends TextTrackList // -> EventTarget
                                                                                                                          ? TextTrackListEventMap
                                                                                                                          : Target extends VideoDecoder // -> EventTarget
                                                                                                                            ? VideoDecoderEventMap
                                                                                                                            : Target extends VideoEncoder // -> EventTarget
                                                                                                                              ? VideoEncoderEventMap
                                                                                                                              : Target extends VisualViewport // -> EventTarget
                                                                                                                                ? VisualViewportEventMap
                                                                                                                                : Target extends WakeLockSentinel // -> EventTarget
                                                                                                                                  ? WakeLockSentinelEventMap
                                                                                                                                  : Target extends WebSocket // -> EventTarget
                                                                                                                                    ? WebSocketEventMap
                                                                                                                                    : Target extends Window // -> EventTarget
                                                                                                                                      ? WindowEventMap
                                                                                                                                      : Target extends Worker // -> EventTarget
                                                                                                                                        ? WorkerEventMap
                                                                                                                                        : Target extends XMLHttpRequestEventTarget // -> EventTarget
                                                                                                                                          ? XMLHttpRequestEventTargetEventMap
                                                                                                                                          : Record<
                                                                                                                                              string,
                                                                                                                                              Event
                                                                                                                                            >;

export type EventType<Target extends EventTarget> = Extract<
  keyof EventMap<Target>,
  string
>;
