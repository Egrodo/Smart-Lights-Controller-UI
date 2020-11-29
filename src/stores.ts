// DeviceState Store
import { readable, writable } from 'svelte/store';
import InitialDeviceState from './constants/DeviceSchema';
import type { Writable } from 'svelte/types/runtime/store';
import type { DeviceState as DeviceStateType, CurrentSelections as CurrentSelectionsType } from './types';

export const DeviceState: Writable<DeviceStateType> = writable(InitialDeviceState);

export const CurrentSelections: Writable<CurrentSelectionsType> = writable([]);

// This should be readable but I cannot figure out how to define it from elsewhere
export const NearestColorFn: Writable<Function> = writable(null);
