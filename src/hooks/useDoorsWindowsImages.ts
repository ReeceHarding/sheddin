import { useMemo } from 'react';
import { DOOR_WINDOW_IMAGES } from '../config/imagePaths';

interface Options {
  entry: string;
  windows: string;
  interior: string;
}

export const useDoorsWindowsImages = (options: Options) => {
  return useMemo(() => {
    const getImageKey = () => {
      const entry = options.entry === 'front-entry' ? 'frontEntry' : 'sideEntry';
      const windows = options.windows === 'more-glass' ? 'MoreGlass' : 'MorePrivacy';
      const interior = options.interior === 'fully-equipped' ? 'FullyEquipped' : 'ShellOnly';
      return `${entry}${windows}${interior}` as keyof typeof DOOR_WINDOW_IMAGES;
    };

    const imageKey = getImageKey();
    const images = DOOR_WINDOW_IMAGES[imageKey];

    return {
      exteriorImage: images.exterior,
      floorPlanImage: images.floorPlan
    };
  }, [options]);
};