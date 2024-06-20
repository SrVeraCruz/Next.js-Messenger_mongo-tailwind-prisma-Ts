"use client"

import useActiveChannel from "@/app/hooks/useActiveChannels"

export default function ActiveStatus() {
  useActiveChannel()

  return null
}