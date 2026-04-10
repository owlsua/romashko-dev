export type TentacleAlign = 'left' | 'right' | 'center';

export type TentacleCommandName =
  | 'about'
  | 'skills'
  | 'github'
  | 'cv'
  | 'linkedin'
  | 'help'
  | 'links'
  | 'weather'
  | 'terminal';

export type TentacleOverlayClass =
  | 'tentacleLeg1'
  | 'tentacleLeg2'
  | 'tentacleLeg3'
  | 'tentacleLeg4'
  | 'tentacleLeg5'
  | 'tentacleLeg6'
  | 'tentacleLeg7'
  | 'tentacleLeg8';

export interface TentacleCommand {
  name: TentacleCommandName;
  label: string;
  overlayClass: TentacleOverlayClass;
  left: string;
  top: string;
  align: TentacleAlign;
  href?: string;
}
