/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Interface defining the structure of a vacation object.
 */
export interface Vacation {
  id: string;
  employeeName: string;
  vacationType: string;
  startDate: string;
  endDate: string;
}

// FIX: Define and export the Video interface.
/**
 * Interface defining the structure of a video object.
 */
export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
}
