import pymysql
pymysql.version_info = (2, 1, 1, "final", 0)  # Ensure this matches your pymysql version
pymysql.install_as_MySQLdb()