import sys
from subprocess import call
# from picamera import PiCamera
import curses
import boto3

args = sys.argv
filename = args[1]
duration = int(args[2])
converted_filename = "{0}.mp4".format(filename)

try:
	stdscr = curses.initscr()
	curses.mousemask(1)
	curses.noecho()
	curses.cbreak()

	while True:
		event = stdscr.getch()
		if event == curses.KEY_MOUSE:
			_, mx, my, _, _ = curses.getmouse()
		break

finally:
	stdscr.keypad(0)
	curses.echo()
	curses.nocbreak()
	curses.endwin()

print('done')
sys.exit(0)
