// DeviceState Store
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/types/runtime/store';
import InitialDeviceState from './constants/DeviceSchema';
import type { DeviceState as DeviceStateType, CurrentSelections as CurrentSelectionsType } from './types';

export const DeviceState: Writable<DeviceStateType> = writable(InitialDeviceState);

export const CurrentSelections: Writable<CurrentSelectionsType> = writable([]);
