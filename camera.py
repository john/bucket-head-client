import sys
import subprocess
import io
import curses
import picamera
import boto3

## Take a stream and write it to a file
def write_video(stream, fname):
  with stream.lock:
    # Find the first header frame in the video
    for frame in stream.frames:
      if frame.frame_type == picamera.PiVideoFrameType.sps_header:
        stream.seek(frame.position)
        break
    # Write the rest of the stream to disk
    with io.open('{0}.h264'.format(fname), 'wb') as output:
      output.write(stream.read())

args = sys.argv
filename = args[1]
#duration = int(args[2])
converted_filename = "{0}.mp4".format(filename)
camera = picamera.PiCamera()

try:
  stdscr = curses.initscr()
  curses.mousemask(1)
  curses.noecho()
  curses.cbreak()
  # camera.resolution = (640, 480)
  camera.rotation = 180 
  stream = picamera.PiCameraCircularIO(camera, seconds=5)
  camera.start_recording(stream, format='h264')

  # Raw input works for ascii, but curses ('getch') lets you capture mouse input as well
  # inp = raw_input('press any key to record')
  event = stdscr.getch()
  camera.wait_recording(5)
  write_video(stream, filename)

  subprocess.call(["MP4Box", "-fps", "30", "-add", "{0}.h264".format(filename), converted_filename])

# Send it to S3
  s3 = boto3.resource('s3')
  data = open(converted_filename, 'rb')
  s3.Bucket('buckethead-uploadedfiles-dt361823pw2n').put_object(Key=converted_filename, Body=data)

finally:
  camera.stop_recording()
  stdscr.keypad(0)
  curses.echo()
  curses.nocbreak()
  curses.endwin()
  
