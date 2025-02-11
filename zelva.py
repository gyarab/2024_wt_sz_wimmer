from turtle import forward, left, right, shape, exitonclick
from math import sqrt

def DrawHouse(Size : int) -> None:
    DiagonalSize : int = sqrt(2 * (Size ** 2))
    left(90)
    forward(Size)
    right(90)
    forward(Size)
    right(135)
    forward(DiagonalSize)
    left(135)
    forward(Size)
    left(90)
    forward(Size)
    left(45)
    forward(DiagonalSize / 2)
    left(90)
    forward(DiagonalSize / 2)
    left(90)
    forward(DiagonalSize)

shape("turtle")
DrawHouse(100)
exitonclick()
