"use client";

import * as React from "react";
import type { History } from "@standup/contracts";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";

const MotionTimelineItem = motion(TimelineItem);
const MotionTypography = motion(Typography);
const MotionDot = motion(TimelineDot);

interface HistoryTimelineProps {
  entries: History[];
}

// Updated Theme Palette
const ORANGE = "#FF6B01";
const WHITE = "#FFFFFF";
const BG_DARK = "#0a0a0a"; // Matches your Hero section
const TEXT_MUTED = "rgba(255, 255, 255, 0.6)";

/* =======================
    Animation Constants
======================= */
const ITEM_DURATION = 0.8;
const YEAR_DURATION = 0.6;
const DOT_PULSE_DURATION = 2.5;
const EASE = "easeOut";

export default function HistoryTimeline({ entries }: HistoryTimelineProps) {
  if (!entries?.length) return null;

  return (
    <Box 
      id="history" 
      className="w-full py-24 px-6" 
      sx={{ backgroundColor: BG_DARK, position: 'relative', overflow: 'hidden' }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B01] blur-[150px] opacity-10 pointer-events-none" />

      <Typography
        variant="h3"
        align="center"
        fontWeight={900}
        mb={10}
        sx={{ 
          color: WHITE,
          textTransform: 'uppercase',
          fontStyle: 'italic',
          letterSpacing: '-0.05em'
        }}
      >
        History of <span style={{ color: ORANGE }}>Indian Stand-Up</span>
      </Typography>

      <Timeline position="alternate">
        {entries.map((item, index) => {
          const fromLeft = index % 2 === 0;

          return (
            <MotionTimelineItem
              key={item.id}
              initial={{ opacity: 0, x: fromLeft ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: ITEM_DURATION, ease: EASE }}
              sx={{ minHeight: '120px' }}
            >
              {/* YEAR */}
              <TimelineOppositeContent
                sx={{ m: "auto 0", px: 4 }}
                align={fromLeft ? "right" : "left"}
              >
                <MotionTypography
                  variant="h5"
                  fontWeight={800}
                  sx={{ 
                    color: ORANGE,
                    fontFamily: 'monospace', // Gives a technical/modern vibe
                    textShadow: `0 0 15px ${ORANGE}44`
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: YEAR_DURATION, delay: 0.2 }}
                >
                  {String(item.year)}
                </MotionTypography>
              </TimelineOppositeContent>

              {/* CENTER SEPARATOR */}
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                
                <MotionDot
                  sx={{ 
                    backgroundColor: ORANGE,
                    border: `2px solid ${WHITE}`,
                    boxShadow: `0 0 20px ${ORANGE}`
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      `0 0 10px ${ORANGE}66`,
                      `0 0 25px ${ORANGE}aa`,
                      `0 0 10px ${ORANGE}66`,
                    ],
                  }}
                  transition={{
                    duration: DOT_PULSE_DURATION,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <TimelineConnector sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
              </TimelineSeparator>

              {/* CONTENT CARD */}
              <TimelineContent sx={{ py: "24px", px: 4 }}>
                <motion.div
                   whileHover={{ x: fromLeft ? 10 : -10 }}
                   transition={{ type: "spring", stiffness: 300 }}
                >
                  <Typography
                    variant="h6"
                    component="span"
                    fontWeight={800}
                    sx={{ color: WHITE, textTransform: 'uppercase' }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    mt={1}
                    sx={{ 
                      color: TEXT_MUTED, 
                      maxWidth: '400px',
                      lineHeight: 1.6 
                    }}
                  >
                    {item.description}
                  </Typography>
                </motion.div>
              </TimelineContent>
            </MotionTimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
}