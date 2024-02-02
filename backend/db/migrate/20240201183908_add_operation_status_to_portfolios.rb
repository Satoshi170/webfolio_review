class AddOperationStatusToPortfolios < ActiveRecord::Migration[7.0]
  def change
    add_column :portfolios, :operation_status, :integer, default: 0, null: false

    add_check_constraint :portfolios, 'operation_status IN (0, 1, 2)', name: 'check_portfolios_on_operation_status'
  end
end
