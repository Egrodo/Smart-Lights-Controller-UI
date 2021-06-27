// DeviceState Store
import { writable } from 'svelte/store';
import InitialDeviceState from './constants/DeviceSchema';
import type { Writable } from 'svelte/types/runtime/store';
import type { DeviceState as DeviceStateType, CurrentSelections as CurrentSelectionsType } from './types';

export const DeviceState: Writable<DeviceStateType> = writable(InitialDeviceState);

export const CurrentSelections: Writable<CurrentSelectionsType> = writable([]);

// Indicates whether something is currently loading so as to block user from pressing something else too fast.
export const IsLoadingLock: Writable<boolean> = writable(false);
