import { computed } from 'mobx';
import { TravelBox } from "../models";
import patrols from "../data/patrols.json";
import patrolAssignments from "../data/patrolAssignments.json";
import random from "../lib/random";
import _ from 'lodash';

export default class PatrolAssignment {
  name = null;
  mission = null;
  travelBoxes = null;

  static CreateAssignment (base, startDate) {
    var dateRange;
    if (startDate.getMonth() < 6)
      dateRange = `Early ${startDate.getFullYear()}`;
    else
      dateRange = `Late ${startDate.getFullYear()}`;
    const roll = _.sum(random.dice(6, 2)) - 2; // 2d6, adjusted for offset
    var name = patrolAssignments[base][dateRange][roll];
    var mission = null;
    const matches = name.match(/^(.*)\s-\s([A-Z])$/)
    if (matches) {
      name = matches[1];
      mission = matches[2];
    } else {
      mission = null;
    }
    console.log(`Picking assignment for ${dateRange}: roll ${roll+2} = ${name}, ${mission}`);
    return new PatrolAssignment(name, mission);
  }

  constructor(name, mission=null) {
    this.name = name;
    this.mission = mission;
    this.travelBoxes = patrols[name].map((box) => {
      return new TravelBox(box);
    });
  }

  @computed get isMission() {
    return this.mission != null;
  }

  @computed get missionName() {
    switch (this.mission) {
      case 'M': return "Minelaying";
      case 'T': return "Transport";
      case 'L': return "Lifeguard";
      case 'R': return "Recon";
      case 'W': return "Wolfpack";
      default: return this.mission;
    }
  }
}
