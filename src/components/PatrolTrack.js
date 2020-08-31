import React from "react"
import { inject, observer } from "mobx-react"
import { TravelBox } from "../components"
import css from "./PatrolTrack.module.css"

export default inject("appStore")(
  observer(({ appStore }) => {
    const patrol = appStore.patrol

    const indexOfCurrentBox = patrol.assignment.travelBoxes.indexOf(
      patrol.currentTravelBox
    )
    let previousBox =
      indexOfCurrentBox > 0
        ? patrol.assignment.travelBoxes[indexOfCurrentBox - 1]
        : null
    let nextBox =
      indexOfCurrentBox <= patrol.assignment.travelBoxes.length
        ? patrol.assignment.travelBoxes[indexOfCurrentBox + 1]
        : null

    if (previousBox == null) previousBox = { displayName: patrol.base }
    if (nextBox == null) nextBox = { displayName: patrol.base }

    return (
      <div className={css.track + " row align-items-center"}>
        <div className={css.previous + " col"}>
          <TravelBox box={previousBox} />
        </div>

        <div className={css.current + " col-6"}>
          <TravelBox box={patrol.currentTravelBox} />
        </div>

        <div className={css.next + " col"}>
          <TravelBox box={nextBox} />
        </div>
      </div>
    )
  })
)
