import pymysql

def execute_sql_file(filename):
    try:
        # Connect to database
        conn = pymysql.connect(
            host='localhost',
            user='root',
            password='Neeli26??',
            database='sustainx'
        )
        cursor = conn.cursor()
        
        # Read the SQL file
        with open(filename, 'r') as file:
            sql_content = file.read()
        
        # Split by semicolon and execute each statement
        statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]
        
        for statement in statements:
            if statement:
                try:
                    cursor.execute(statement)
                    print(f"Executed: {statement[:50]}...")
                except Exception as e:
                    print(f"Error executing statement: {e}")
                    print(f"Statement: {statement[:100]}...")
        
        conn.commit()
        print(f"Successfully executed {filename}")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    print("Loading DDL...")
    execute_sql_file('../database/dbDDL.sql')
    
    print("\nLoading DML...")
    execute_sql_file('../database/dbDML.sql')