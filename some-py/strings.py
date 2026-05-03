# This is a line comment

first_name = "Guybrush"
last_name = "Threepwood"

"""
This
comment
has multiple
lines
"""


bio = f" My name is {first_name} {last_name}.\nI am learning Python.\nProgramming is awesome!"

#             01
book_title = "Käpt'n Blaubär"
print(book_title[1])
print(book_title[-5])

print(book_title[7:])
print(book_title[7:11])
print(book_title[:6])

len(bio)
print("Python" in bio)
print("Java" not in bio)
print(first_name.upper())
print(last_name.lower())
print(bio)
print(bio.strip())
# print(bio)

input().strip()
print(bio.replace("Python", "coding"))
print(bio.strip().replace("\n", " ").split(" "))
# greeting = 'He said, "Python' + 's great!"'
greeting = 'He said, "Python\'s great!"'
print(greeting)

print("first Line\nsecond line\ttabbed")
