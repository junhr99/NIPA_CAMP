from flask import Flask, render_template
import pymysql

app = Flask(__name__)

@app.route('/')
def index():
    db_conn = pymysql.connect(host='localhost', user='root', 
            password='1234', database='myweb',
            autocommit=True, cursorclass=pymysql.cursors.DictCursor)
    value='world'
    
    with db_conn:
        db_cursor = db_conn.cursor()
        db_cursor.execute("SELECT * FROM users")
        users = db_cursor.fetchall()
        

        db_cursor.execute("select * from workouts")
        workouts = db_cursor.fetchall()
        print(workouts)

        db_cursor.execute("select * from diets")
        diets = db_cursor.fetchall()

    #db_conn.close()

    return render_template('index.html', fromflask=value,users=users,workouts=workouts,diets=diets)

if __name__ == "__main__":
    app.run(debug=True)